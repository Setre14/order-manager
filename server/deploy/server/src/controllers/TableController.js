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
var TableController = /** @class */ (function (_super) {
    __extends(TableController, _super);
    function TableController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableController.COLLECTION_NAME = 'table';
    TableController.INDEX = ['user'];
    return TableController;
}(mongodb_1.MongoDB));
exports.TableController = TableController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9jb250cm9sbGVycy9UYWJsZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1DO0FBRW5DO0lBQXFDLG1DQUFPO0lBQTVDOztJQUdBLENBQUM7SUFGVSwrQkFBZSxHQUFHLE9BQU8sQ0FBQztJQUMxQixxQkFBSyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsc0JBQUM7Q0FBQSxBQUhELENBQXFDLGlCQUFPLEdBRzNDO0FBSFksMENBQWUifQ==