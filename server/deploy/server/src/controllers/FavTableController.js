"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("../mongodb");
var FavTableController = /** @class */ (function (_super) {
    __extends(FavTableController, _super);
    function FavTableController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FavTableController.COLLECTION_NAME = 'fav-table';
    FavTableController.INDEX = ['user'];
    return FavTableController;
}(mongodb_1.MongoDB));
exports.FavTableController = FavTableController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmF2VGFibGVDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9jb250cm9sbGVycy9GYXZUYWJsZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtDO0FBRWxDO0lBQXdDLHNDQUFPO0lBQS9DOztJQUdBLENBQUM7SUFGVSxrQ0FBZSxHQUFHLFdBQVcsQ0FBQztJQUM5Qix3QkFBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIseUJBQUM7Q0FBQSxBQUhELENBQXdDLGlCQUFPLEdBRzlDO0FBSFksZ0RBQWtCIn0=