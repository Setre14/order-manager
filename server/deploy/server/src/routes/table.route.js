"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TableController_1 = require("../controllers/TableController");
var shared_1 = require("../../../shared");
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    TableController_1.TableController.getAll().then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.GET, function (req, res) {
    TableController_1.TableController.get(req.body).then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    TableController_1.TableController.insert(req.body);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUucm91dGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL3JvdXRlcy90YWJsZS5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFpQztBQUNqQyxrRUFBK0Q7QUFDL0QsMENBQTJDO0FBRTNDLElBQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUksbUJBQVUsQ0FBQyxHQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUN0QyxpQ0FBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDaEMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsR0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDdkMsaUNBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsTUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDMUMsaUNBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsTUFBTSxDQUFDIn0=