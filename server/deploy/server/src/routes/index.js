"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var order_route_1 = __importDefault(require("./order.route"));
var user_route_1 = __importDefault(require("./user.route"));
var item_route_1 = __importDefault(require("./item.route"));
var table_route_1 = __importDefault(require("./table.route"));
var type_route_1 = __importDefault(require("./type.route"));
var shared_1 = require("../../../shared");
var routes = express_1.Router();
routes.use("/" + shared_1.RestAPI.ORDER, order_route_1.default);
routes.use("/" + shared_1.RestAPI.USER, user_route_1.default);
routes.use("/" + shared_1.RestAPI.ITEM, item_route_1.default);
routes.use("/" + shared_1.RestAPI.TABLE, table_route_1.default);
routes.use("/" + shared_1.RestAPI.TYPE, type_route_1.default);
exports.default = routes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL3JvdXRlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLG1DQUFpQztBQUNqQyw4REFBdUM7QUFDdkMsNERBQXFDO0FBQ3JDLDREQUFxQztBQUNyQyw4REFBdUM7QUFDdkMsNERBQXFDO0FBQ3JDLDBDQUF3QztBQUV4QyxJQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFJLGdCQUFPLENBQUMsS0FBTyxFQUFFLHFCQUFVLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUksZ0JBQU8sQ0FBQyxJQUFNLEVBQUUsb0JBQVMsQ0FBQyxDQUFDO0FBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBSSxnQkFBTyxDQUFDLElBQU0sRUFBRSxvQkFBUyxDQUFDLENBQUM7QUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFJLGdCQUFPLENBQUMsS0FBTyxFQUFFLHFCQUFVLENBQUMsQ0FBQztBQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUksZ0JBQU8sQ0FBQyxJQUFNLEVBQUUsb0JBQVMsQ0FBQyxDQUFDO0FBRTFDLGtCQUFlLE1BQU0sQ0FBQyJ9