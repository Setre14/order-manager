"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ItemController_1 = require("../controllers/ItemController");
var shared_1 = require("../../../shared");
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    ItemController_1.ItemController.getAll().then(function (result) {
        res.send(result);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    ItemController_1.ItemController.insert(req.body);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvcm91dGVzL2l0ZW0ucm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsZ0VBQTZEO0FBQzdELDBDQUEwRDtBQUUxRCxJQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFJLG1CQUFVLENBQUMsR0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDdEMsK0JBQWMsQ0FBQyxNQUFNLEVBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBSSxtQkFBVSxDQUFDLE1BQVEsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHO0lBQzFDLCtCQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQyJ9