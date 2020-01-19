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
var config_1 = require("./config/config");
config_1.Config.print();
// Create a new express application instance
var app = express_1.default();
// Call midlewares
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(body_parser_1.default.json());
//Set all routes from routes folder
app.use("/", routes_1.default);
var PORT = process.env.OM_SERVER_PORT ? process.env.OM_SERVER_PORT : 3001;
app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvREFBOEI7QUFDOUIsNERBQXFDO0FBQ3JDLGtEQUE0QjtBQUM1Qiw4Q0FBd0I7QUFDeEIsb0RBQThCO0FBQzlCLDBDQUF5QztBQUV6QyxlQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFZiw0Q0FBNEM7QUFDNUMsSUFBTSxHQUFHLEdBQUcsaUJBQU8sRUFBRSxDQUFDO0FBRXRCLGtCQUFrQjtBQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBTSxFQUFFLENBQUMsQ0FBQztBQUNsQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUUzQixtQ0FBbUM7QUFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0JBQU0sQ0FBQyxDQUFDO0FBRXJCLElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO0FBRTNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO0lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUMsQ0FBQyJ9