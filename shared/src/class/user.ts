import * as bcrypt from "bcryptjs";

export class User {
    id: number;

    username: string;

    password: string;

    role: string;

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}
