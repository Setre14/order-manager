"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FloorplanController_1 = require("../controllers/FloorplanController");
var src_1 = require("../../../shared/src");
var router = express_1.Router();
router.get("/" + src_1.RestAction.ALL, function (req, res) {
    FloorplanController_1.FloorplanController.getAll().then(function (result) {
        res.send(result);
    });
});
router.post("/" + src_1.RestAction.INSERT, function (req, res) {
    FloorplanController_1.FloorplanController.insert(req.body);
    res.send();
});
router.post("/" + src_1.RestAction.UPDATE, function (req, res) {
    var floorplan = req.body;
    FloorplanController_1.FloorplanController.update({ location: floorplan.location }, floorplan);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvb3JwbGFuLnJvdXRlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9yb3V0ZXMvZmxvb3JwbGFuLnJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQWlDO0FBQ2pDLDBFQUF1RTtBQUN2RSwyQ0FBNEQ7QUFFNUQsSUFBTSxNQUFNLEdBQUcsZ0JBQU0sRUFBRSxDQUFDO0FBRXhCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBSSxnQkFBVSxDQUFDLEdBQUssRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQ3RDLHlDQUFtQixDQUFDLE1BQU0sRUFBYSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07UUFDL0MsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFJLGdCQUFVLENBQUMsTUFBUSxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDMUMseUNBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBSSxnQkFBVSxDQUFDLE1BQVEsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQzFDLElBQU0sU0FBUyxHQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDdEMseUNBQW1CLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLENBQUUsQ0FBQztJQUN6RSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9