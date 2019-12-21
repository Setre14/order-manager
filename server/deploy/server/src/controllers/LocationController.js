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
var LocationController = /** @class */ (function (_super) {
    __extends(LocationController, _super);
    function LocationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocationController.COLLECTION_NAME = 'location';
    LocationController.INDEX = ['location'];
    return LocationController;
}(mongodb_1.MongoDB));
exports.LocationController = LocationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb25Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9jb250cm9sbGVycy9Mb2NhdGlvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtDO0FBRWxDO0lBQXdDLHNDQUFPO0lBQS9DOztJQUdBLENBQUM7SUFGVSxrQ0FBZSxHQUFHLFVBQVUsQ0FBQztJQUM3Qix3QkFBSyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEMseUJBQUM7Q0FBQSxBQUhELENBQXdDLGlCQUFPLEdBRzlDO0FBSFksZ0RBQWtCIn0=