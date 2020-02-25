import { Injectable } from '@angular/core';
import { User, RestAPI, RestAction } from '../../../../shared';
import { CommunicationService } from './communication.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: Map<string, User> = new Map<string, User>();
  TOKEN_KEY = 'token';
  
  isLoggedIn: boolean = false;

  constructor(
    private comService: CommunicationService,
    private storageService: StorageService
  ) { 
    this.setLoggedIn();
  }

  getUsers(): User[] {
    return Array.from(this.users.values());
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

  async setLoggedIn(): Promise<void> {
    const token = await this.storageService.retrieve(this.TOKEN_KEY);

    this.isLoggedIn = token ? true : false;
    console.log(this.isLoggedIn)
  }

  async login(u: any): Promise<boolean> {
    // await this.storageService.removeKey(this.TOKEN_KEY)

    if (this.isLoggedIn) {
      return true;
    }

    const res: any = await this.comService.post(RestAPI.AUTH, RestAction.AUTHENTICATE, u);

    if (res.token) {
      this.storageService.store(this.TOKEN_KEY, res.token);

      this.isLoggedIn = true;
      return true;
    }

    return false;
  }

  async logout(): Promise<void> {
    this.isLoggedIn = false;
    console.log(this.isLoggedIn)
    await this.storageService.removeKey(this.TOKEN_KEY);
  }
  
  load() {
    this.comService.get<User>(RestAPI.USER, RestAction.ALL).then(res => {
      const users = new Map<string, User>();
      res.forEach(r => {
        users.set(r._id, User.fromJson(r));
      });
      this.users = users;
    })
  }
}
