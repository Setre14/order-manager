"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var TypeController_1 = require("../controllers/TypeController");
var shared_1 = require("../../../shared");
var router = express_1.Router();
router.get("/" + shared_1.RestAction.ALL, function (req, res) {
    TypeController_1.TypeController.getAll().then(function (result) {
        var types = [];
        result.forEach(function (r) { return types.push(r.type); });
        res.send(types);
    });
});
router.post("/" + shared_1.RestAction.INSERT, function (req, res) {
    TypeController_1.TypeController.insert(req.body);
    res.send();
});
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvcm91dGVzL3R5cGUucm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtQ0FBaUM7QUFDakMsZ0VBQTZEO0FBQzdELDBDQUEwRDtBQUUxRCxJQUFNLE1BQU0sR0FBRyxnQkFBTSxFQUFFLENBQUM7QUFFeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFJLG1CQUFVLENBQUMsR0FBSyxFQUFFLFVBQUMsR0FBRyxFQUFFLEdBQUc7SUFDdEMsK0JBQWMsQ0FBQyxNQUFNLEVBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1FBQ3JDLElBQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQTtRQUN2QyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUksbUJBQVUsQ0FBQyxNQUFRLEVBQUUsVUFBQyxHQUFHLEVBQUUsR0FBRztJQUMxQywrQkFBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUMifQ==