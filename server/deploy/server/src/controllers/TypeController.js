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
var TypeController = /** @class */ (function (_super) {
    __extends(TypeController, _super);
    function TypeController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TypeController.COLLECTION_NAME = 'type';
    TypeController.INDEX = ['type'];
    return TypeController;
}(mongodb_1.MongoDB));
exports.TypeController = TypeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL2NvbnRyb2xsZXJzL1R5cGVDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtQztBQUVuQztJQUFvQyxrQ0FBTztJQUEzQzs7SUFHQSxDQUFDO0lBRlUsOEJBQWUsR0FBRyxNQUFNLENBQUM7SUFDekIsb0JBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVCLHFCQUFDO0NBQUEsQUFIRCxDQUFvQyxpQkFBTyxHQUcxQztBQUhZLHdDQUFjIn0=