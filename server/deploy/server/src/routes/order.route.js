"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var shared_1 = require("../../../shared");
var OrderController_1 = require("../controllers/OrderController");
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    OrderController_1.OrderController.getAll().then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.GET, function (req, res) {
    OrderController_1.OrderController.get(req.body).then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    OrderController_1.OrderController.insert(req.body);
    res.send();
});
router.post("/" + shared_1.RestAction.UPDATE, function (req, res) {
    var order = req.body;
    OrderController_1.OrderController.update({ uuid: order.uuid }, order);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXIucm91dGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL3JvdXRlcy9vcmRlci5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLG1DQUFpQztBQUNqQywwQ0FBa0Q7QUFDbEQsa0VBQStEO0FBRS9ELElBQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUksbUJBQVUsQ0FBQyxHQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUN0QyxpQ0FBZSxDQUFDLE1BQU0sRUFBUyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDdkMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsR0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDdkMsaUNBQWUsQ0FBQyxHQUFHLENBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDN0MsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsTUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDMUMsaUNBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsTUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDMUMsSUFBTSxLQUFLLEdBQVUsR0FBRyxDQUFDLElBQUksQ0FBQztJQUM5QixpQ0FBZSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLEVBQUUsS0FBSyxDQUFFLENBQUM7SUFDcEQsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMifQ==