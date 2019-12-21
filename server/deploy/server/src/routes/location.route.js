"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var LocationController_1 = require("../controllers/LocationController");
var shared_1 = require("../../../shared");
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    LocationController_1.LocationController.getAll().then(function (result) {
        var locations = [];
        result.forEach(function (r) { return locations.push(r.location); });
        res.send(locations);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    LocationController_1.LocationController.insert(req.body);
    res.send();
});
router.post("/" + shared_1.RestAction.DELETE, function (req, res) {
    LocationController_1.LocationController.delete(req.body);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb24ucm91dGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL3JvdXRlcy9sb2NhdGlvbi5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFpQztBQUNqQyx3RUFBcUU7QUFDckUsMENBQTBEO0FBRTFELElBQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQUksbUJBQVUsQ0FBQyxHQUFLLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUN0Qyx1Q0FBa0IsQ0FBQyxNQUFNLEVBQU8sQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1FBQ3hDLElBQU0sU0FBUyxHQUFhLEVBQUUsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQTFCLENBQTBCLENBQUMsQ0FBQTtRQUMvQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUksbUJBQVUsQ0FBQyxNQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUMxQyx1Q0FBa0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQyxDQUFDO0FBR0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsTUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDMUMsdUNBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9