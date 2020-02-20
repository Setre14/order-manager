import * as bcrypt from "bcryptjs";
import { DBElem } from './dbElem';

export class User extends DBElem {
    private username: string = 'user';
    private firstName: string = 'firstName';
    private lastName: string = 'lastName';

    // password: string = 'pass';

    role: string = 'default';

    token: string = '';

    static fromJson(obj: User): User {
        const user = new User();
        user._id = obj._id;
        user.disabled = obj.disabled;
        user.username = obj.username;
        user.firstName = obj.firstName;
        user.lastName = obj.lastName;
        user.role = obj.role;
        user.token = obj.token;

        return user;
    }

    // hashPassword() {
    //     this.password = bcrypt.hashSync(this.password, 8);
    // }

    // checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    //     return bcrypt.compareSync(unencryptedPassword, this.password);
    // }
}
