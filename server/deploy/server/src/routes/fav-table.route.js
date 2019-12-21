"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FavTableController_1 = require("../controllers/FavTableController");
var shared_1 = require("../../../shared");
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    FavTableController_1.FavTableController.getAll().then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.GET, function (req, res) {
    FavTableController_1.FavTableController.get(req.body).then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    FavTableController_1.FavTableController.insert(req.body);
    res.send();
});
router.post("/" + shared_1.RestAction.UPDATE, function (req, res) {
    var favTable = req.body;
    FavTableController_1.FavTableController.update({ user: favTable.user }, favTable);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2LXRhYmxlLnJvdXRlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9yb3V0ZXMvZmF2LXRhYmxlLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWlDO0FBQ2pDLHdFQUFxRTtBQUNyRSwwQ0FBcUQ7QUFFckQsSUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBSSxtQkFBVSxDQUFDLEdBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ3RDLHVDQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDbkMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLG1CQUFVLENBQUMsR0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDdkMsdUNBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1FBQ3hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBSSxtQkFBVSxDQUFDLE1BQVEsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQzFDLHVDQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUksbUJBQVUsQ0FBQyxNQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUMxQyxJQUFNLFFBQVEsR0FBYSxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3BDLHVDQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDN0QsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMifQ==