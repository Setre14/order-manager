import * as bcrypt from "bcryptjs";

export class User {
    id: number = 5;

    username: string = 'user';

    // password: string = 'pass';

    role: string = 'default';

    // hashPassword() {
    //     this.password = bcrypt.hashSync(this.password, 8);
    // }

    // checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    //     return bcrypt.compareSync(unencryptedPassword, this.password);
    // }
}
