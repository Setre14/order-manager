import { Injectable } from '@angular/core';
import { User, RestAPI, RestAction, Token, Role } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';
import { NavController } from '@ionic/angular';
import { StorableService } from './storable.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends StorableService<User> {
  restAPI = RestAPI.USER;
  conversion = User.fromJson;

  elements: Map<string, User> = new Map<string, User>();
  TOKEN_KEY = 'token';

  loggedIn: boolean = false;
  curUser: User;

  constructor(
    protected comService: CommunicationService,
    private navCtrl: NavController,
    private storageService: StorageService,
    private utilService: UtilService
  ) {
    super(comService);
    this.isLoggedIn();
  }

  getUsers(): User[] {
    return Array.from(this.elements.values());
  }

  getUser(): User {
    return this.curUser;
  }

  async add(user: User): Promise<void> {
    this.elements.set(user._id, user);
    if (user.role == Role.ADMIN) {
      Array.from(this.elements.values())
        .filter(u => u.default)
        .forEach(u => this.elements.delete(u._id));
    }
    this.dbUpdate(user);

    if (user.role == Role.ADMIN && this.curUser.default) {
      this.logout();
    }
  }

  disable(id: string) {
    if (this.elements.has(id)) {
      const user = this.elements.get(id);

      if (user.role == Role.ADMIN) {
        const adminUsers = Array.from(this.elements.values()).filter(
          u => u.role == Role.ADMIN
        ).length;
        if (adminUsers <= 1) {
          this.utilService.showToast(
            `Der letzte Admin user (${user.username}) kann nicht gelöscht werden.`
          );
          return;
        }
      }

      this.elements.delete(id);
      this.dbDisableId(id);
    }
  }

  async isLoggedIn(): Promise<boolean> {
    const token: Token = await this.storageService.retrieve(this.TOKEN_KEY);

    if (!token) {
      this.loggedIn = false;
      return;
    }

    const curDate: Date = new Date();

    if (curDate.getMilliseconds() < curDate.getMilliseconds()) {
      await this.storageService.removeKey(this.TOKEN_KEY);
      this.loggedIn = false;
      return;
    }

    this.setUser(token.userId);

    this.loggedIn = true;

    return this.loggedIn;
  }

  async setUser(userId: string) {
    this.dbGetFiltered({ _id: userId })
      .then(res => {
        if (res.has(userId)) {
          this.curUser = res.get(userId);
        } else {
          this.logout();
        }
      });
  }

  isAdmin(): boolean {
    if (!this.isLoggedIn || !this.curUser) {
      return false;
    } else {
      return this.curUser.role == Role.ADMIN;
    }
  }

  async login(u: any): Promise<boolean> {
    if (this.loggedIn) {
      return true;
    }

    const res: Token[] = await this.comService.post<Token>(
      RestAPI.AUTH,
      RestAction.AUTHENTICATE,
      u
    );

    if (res.length == 0) {
      this.utilService.showToast('Falscher Username oder Passwort');
      return false;
    }

    const token = res[0];

    this.setUser(token.userId);

    this.storageService.store(this.TOKEN_KEY, token);

    this.loggedIn = true;
    return true;
  }

  async logout(): Promise<void> {
    this.loggedIn = false;
    this.curUser = null;
    this.navCtrl.navigateRoot('');
    await this.storageService.removeKey(this.TOKEN_KEY);
  }
}
