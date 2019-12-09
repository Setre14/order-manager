"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = __importStar(require("bcryptjs"));
var User = /** @class */ (function () {
    function User() {
        this.id = 5;
        this.username = 'user';
        this.password = 'pass';
        this.role = 'default';
    }
    User.prototype.hashPassword = function () {
        this.password = bcrypt.hashSync(this.password, 8);
    };
    User.prototype.checkIfUnencryptedPasswordIsValid = function (unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNoYXJlZC9zcmMvY2xhc3MvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwrQ0FBbUM7QUFFbkM7SUFBQTtRQUNJLE9BQUUsR0FBVyxDQUFDLENBQUM7UUFFZixhQUFRLEdBQVcsTUFBTSxDQUFDO1FBRTFCLGFBQVEsR0FBVyxNQUFNLENBQUM7UUFFMUIsU0FBSSxHQUFXLFNBQVMsQ0FBQztJQVM3QixDQUFDO0lBUEcsMkJBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxnREFBaUMsR0FBakMsVUFBa0MsbUJBQTJCO1FBQ3pELE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLG9CQUFJIn0=