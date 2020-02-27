import { Injectable } from '@angular/core';
import { User, RestAPI, RestAction, Token } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Map<string, User> = new Map<string, User>();
  TOKEN_KEY = 'token';
  
  loggedIn: boolean = false;
  curUser: User;

  constructor(
    private comService: CommunicationService,
    private storageService: StorageService
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
    this.comService.post(RestAPI.USER, RestAction.INSERT_OR_UPDATE, user);
  }

  disable(id: string) {
    if (this.users.has(id)) {
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

  async login(u: any): Promise<boolean> {
    if (this.loggedIn) {
      return true;
    }

    const res: Token[] = await this.comService.post<Token>(RestAPI.AUTH, RestAction.AUTHENTICATE, u);

    if (res.length == 0) {
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
