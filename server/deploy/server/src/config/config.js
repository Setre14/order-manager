"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var conf_json_1 = __importDefault(require("./conf.json"));
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.getMongoDBUrl = function () {
        return process.env.OM_MONGODB_URL ? process.env.OM_MONGODB_URL : conf_json_1.default.mongodb.url;
    };
    Config.getMongoDBName = function () {
        console.log(process.env.MONGODB_NAME);
        return process.env.OM_MONGODB_NAME ? process.env.OM_MONGODB_NAME : conf_json_1.default.mongodb.db;
    };
    Config.print = function () {
        console.log('Config:');
        console.log('\tMONGODB_URL: ' + Config.getMongoDBUrl());
        console.log('\tMONGODB_NAME: ' + Config.getMongoDBName());
    };
    return Config;
}());
exports.Config = Config;
// export default {
//     jwtSecret: "@QEGTUI"
// };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2VydmVyL3NyYy9jb25maWcvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMERBQThCO0FBRTlCO0lBQUE7SUFnQkEsQ0FBQztJQWRVLG9CQUFhLEdBQXBCO1FBQ0ksT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLG1CQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN0RixDQUFDO0lBRU0scUJBQWMsR0FBckI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDckMsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLG1CQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUN2RixDQUFDO0lBRU0sWUFBSyxHQUFaO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUNMLGFBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLHdCQUFNO0FBa0JuQixtQkFBbUI7QUFDbkIsMkJBQTJCO0FBQzNCLEtBQUsifQ==