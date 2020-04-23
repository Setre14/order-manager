import { DBElem } from './dbElem';
import { Role } from '../enum/Role';

export class User extends DBElem {
  username: string = 'user';

  firstName: string = 'firstName';
  lastName: string = 'lastName';
  password: string = '';
  default: boolean = false;

  role: Role = Role.USER;

  constructor(username: string, password: string = '') {
    super();
    this.username = username;
    this.password = password;
  }

  static create(obj: any): User {
    const user = new User(obj.username, obj.password);
    user.firstName = obj.firstName;
    user.lastName = obj.lastName;
    user.password = obj.password;
    user.role = obj.role;

    return user;
  }

  static fromJson(obj: User): User {
    const user = new User(obj.username, '');
    user._id = obj._id;
    user.disabled = obj.disabled;
    user.firstName = obj.firstName;
    user.lastName = obj.lastName;
    user.password = obj.password;
    user.role = obj.role;

    return user;
  }
}
