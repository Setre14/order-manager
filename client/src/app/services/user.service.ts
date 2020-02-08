import { Injectable } from '@angular/core';
import { User, RestAPI, RestAction } from '../../../../shared';
import { CommunicationService } from './communication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  username = 'user1';

  user: User;

  constructor(
    public comService: CommunicationService
  ) { }

  loadUser() {
    this.comService.post<User>(RestAPI.USER, RestAction.GET, { username: this.username }).then(res => this.user = res[0]);
  }
}
