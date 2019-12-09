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
var OrderController = /** @class */ (function (_super) {
    __extends(OrderController, _super);
    function OrderController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderController.COLLECTION_NAME = 'order';
    OrderController.INDEX = ['uuid'];
    return OrderController;
}(mongodb_1.MongoDB));
exports.OrderController = OrderController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9jb250cm9sbGVycy9PcmRlckNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtDO0FBRWxDO0lBQXFDLG1DQUFPO0lBQTVDOztJQUdBLENBQUM7SUFGVSwrQkFBZSxHQUFHLE9BQU8sQ0FBQztJQUMxQixxQkFBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsc0JBQUM7Q0FBQSxBQUhELENBQXFDLGlCQUFPLEdBRzNDO0FBSFksMENBQWUifQ==