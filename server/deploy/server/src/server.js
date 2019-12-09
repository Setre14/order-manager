"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
// Create a new express application instance
var app = express_1.default();
// Call midlewares
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
//Set all routes from routes folder
app.use("/", routes_1.default);
app.listen(3001, function () {
    console.log("Server started on port 3001!");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvREFBOEI7QUFDOUIsNERBQXFDO0FBQ3JDLGtEQUE0QjtBQUM1Qiw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBRTlCLDRDQUE0QztBQUM1QyxJQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUM7QUFFdEIsa0JBQWtCO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBSSxFQUFFLENBQUMsQ0FBQztBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRTNCLG1DQUFtQztBQUNuQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxnQkFBTSxDQUFDLENBQUM7QUFFckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDLENBQUMifQ==