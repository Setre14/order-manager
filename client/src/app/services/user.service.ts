import { Injectable } from '@angular/core';
import { User, RestAPI, RestAction, Token, Role } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Map<string, User> = new Map<string, User>();
  TOKEN_KEY = 'token';
  
  loggedIn: boolean = false;
  curUser: User;

  constructor(
    private navCtrl: NavController,
    private comService: CommunicationService,
    private storageService: StorageService,
    private utilService: UtilService
  ) {
    this.isLoggedIn();
  }

  getUsers(): User[] {
    return Array.from(this.users.values());
  }

  getUser(): User {
    return this.curUser;
  }

  async add(user: User): Promise<void> {
    this.users.set(user._id, user);
    if (user.role == Role.ADMIN) {
      Array.from(this.users.values()).filter(u => u.default).forEach(u => this.users.delete(u._id));
    }
    this.comService.post(RestAPI.USER, RestAction.INSERT_OR_UPDATE, user);

    if (user.role == Role.ADMIN && this.curUser.default) {
      this.logout()
    }
  }

  disable(id: string) {
    if (this.users.has(id)) {
      const user = this.users.get(id);

      if (user.role == Role.ADMIN) {
        const adminUsers = Array.from(this.users.values()).filter(u => u.role == Role.ADMIN).length;
        if (adminUsers <= 1) {
          this.utilService.showToast(`You can not delete the last admin (${user.username})`);
          return;
        }
      }

      this.users.delete(id);
      this.comService.post(RestAPI.USER, RestAction.DISABLE, { _id: id });
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
    this.comService.post<User>(RestAPI.USER, RestAction.GET, { _id: userId }).then(res => {
      this.curUser = res[0];
    })

  }

  isAdmin(): boolean {
    if (!this.isLoggedIn || !this.curUser) {
      return false
    } else {
      return this.curUser.role == Role.ADMIN;
    }
  }

  async login(u: any): Promise<boolean> {
    if (this.loggedIn) {
      return true;
    }

    const res: Token[] = await this.comService.post<Token>(RestAPI.AUTH, RestAction.AUTHENTICATE, u);

    if (res.length == 0) {
      this.utilService.showToast('Wrong username or password');
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
  
  async load() {
    await this.comService.get<User>(RestAPI.USER, RestAction.ALL).then(res => {
      const users = new Map<string, User>();
      res.forEach(r => {
        users.set(r._id, User.fromJson(r));
      });
      this.users = users;
    })
  }
}
