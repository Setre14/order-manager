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
var FloorplanController = /** @class */ (function (_super) {
    __extends(FloorplanController, _super);
    function FloorplanController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FloorplanController.COLLECTION_NAME = 'floorplan';
    FloorplanController.INDEX = ['location'];
    return FloorplanController;
}(mongodb_1.MongoDB));
exports.FloorplanController = FloorplanController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxvb3JwbGFuQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvY29udHJvbGxlcnMvRmxvb3JwbGFuQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0M7QUFFbEM7SUFBeUMsdUNBQU87SUFBaEQ7O0lBR0EsQ0FBQztJQUZVLG1DQUFlLEdBQUcsV0FBVyxDQUFDO0lBQzlCLHlCQUFLLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNoQywwQkFBQztDQUFBLEFBSEQsQ0FBeUMsaUJBQU8sR0FHL0M7QUFIWSxrREFBbUIifQ==