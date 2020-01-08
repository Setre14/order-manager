"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("mongodb"));
var config_json_1 = __importDefault(require("./config/config.json"));
var MongoDB = /** @class */ (function () {
    function MongoDB() {
    }
    MongoDB.getClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mongodb_1.default.connect(MongoDB.URL, { useUnifiedTopology: true })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDB.getDb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, MongoDB.getClient()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client.db(MongoDB.DB)];
                }
            });
        });
    };
    MongoDB.getCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.collection !== undefined) {
                            return [2 /*return*/, this.collection];
                        }
                        return [4 /*yield*/, MongoDB.getDb()];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.createCollection(this.COLLECTION_NAME)];
                    case 2:
                        collection = _a.sent();
                        return [4 /*yield*/, this.updateIndex(collection)];
                    case 3:
                        _a.sent();
                        this.collection = collection;
                        return [2 /*return*/, this.collection];
                }
            });
        });
    };
    MongoDB.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get({})];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MongoDB.get = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.COLLECTION_NAME + ': Get ' + filter);
                        return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [2 /*return*/, collection.find(filter, { projection: this.PROJECTION }).toArray()];
                }
            });
        });
    };
    MongoDB.insert = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.COLLECTION_NAME + ': Insert: ' + obj);
                        return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.insertOne(obj).catch()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.updateIndex = function (collection) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, collection.indexExists(this.INDEX + '_index')];
                    case 1:
                        exists = _a.sent();
                        if (exists) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, collection.dropIndexes()];
                    case 2:
                        _a.sent();
                        if (!(this.INDEX !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, collection.createIndex(this.INDEX, { name: this.INDEX + '_index', unique: true })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.update = function (filter, obj) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(this.COLLECTION_NAME + ': Filter: ' + filter + ', update: ' + obj);
                        return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, this.get(filter)];
                    case 2:
                        item = _a.sent();
                        if (!(item.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, collection.insertOne(obj)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, collection.updateOne(filter, { $set: obj })];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.collection.deleteOne(filter)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.URL = config_json_1.default.mongodb.url;
    MongoDB.DB = config_json_1.default.mongodb.db;
    MongoDB.COLLECTION_NAME = 'colName';
    MongoDB.INDEX = null;
    MongoDB.PROJECTION = { _id: 0 };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbW9uZ29kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHFFQUF1QztBQUV2QztJQUFBO0lBOEVBLENBQUM7SUFyRWdCLGlCQUFTLEdBQXRCOzs7OzRCQUNXLHFCQUFNLGlCQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFBOzRCQUFyRSxzQkFBTyxTQUE4RCxFQUFBOzs7O0tBQ3hFO0lBRVksYUFBSyxHQUFsQjs7Ozs7NEJBQ21CLHFCQUFNLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWxDLE1BQU0sR0FBRyxTQUF5Qjt3QkFDeEMsc0JBQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUM7Ozs7S0FDaEM7SUFFWSxxQkFBYSxHQUExQjs7Ozs7O3dCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7NEJBQy9CLHNCQUFPLElBQUksQ0FBQyxVQUFVLEVBQUM7eUJBQzFCO3dCQUVVLHFCQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQTFCLEVBQUUsR0FBRyxTQUFxQjt3QkFDYixxQkFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBNUQsVUFBVSxHQUFHLFNBQStDO3dCQUVsRSxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFBOzt3QkFBbEMsU0FBa0MsQ0FBQzt3QkFFbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7d0JBQzdCLHNCQUFPLElBQUksQ0FBQyxVQUFVLEVBQUM7Ozs7S0FDMUI7SUFFWSxjQUFNLEdBQW5COzs7OzRCQUNXLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUksRUFBRSxDQUFDLEVBQUE7NEJBQTVCLHNCQUFPLFNBQXFCLEVBQUE7Ozs7S0FDL0I7SUFFWSxXQUFHLEdBQWhCLFVBQW9CLE1BQWM7Ozs7Ozt3QkFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQTt3QkFDbEMscUJBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBdkMsVUFBVSxHQUFHLFNBQTBCO3dCQUU3QyxzQkFBTyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBQzs7OztLQUM3RTtJQUVZLGNBQU0sR0FBbkIsVUFBb0IsR0FBVzs7Ozs7O3dCQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsWUFBWSxHQUFHLEdBQUcsQ0FBQyxDQUFBO3dCQUNuQyxxQkFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUE7O3dCQUF2QyxVQUFVLEdBQUcsU0FBMEI7d0JBRTdDLHFCQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUF2QyxTQUF1QyxDQUFBOzs7OztLQUMxQztJQUVZLG1CQUFXLEdBQXhCLFVBQXlCLFVBQTRCOzs7Ozs0QkFDbEMscUJBQU0sVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFBOzt3QkFBNUQsTUFBTSxHQUFHLFNBQW1EO3dCQUVsRSxJQUFJLE1BQU0sRUFBRTs0QkFDUixzQkFBTzt5QkFDVjt3QkFDRCxxQkFBTSxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUE7O3dCQUE5QixTQUE4QixDQUFDOzZCQUMzQixDQUFBLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFBLEVBQW5CLHdCQUFtQjt3QkFDbkIscUJBQU0sVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFBOzt3QkFBdkYsU0FBdUYsQ0FBQzs7Ozs7O0tBRS9GO0lBRVksY0FBTSxHQUFuQixVQUFvQixNQUFjLEVBQUUsR0FBVzs7Ozs7O3dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsWUFBWSxHQUFHLE1BQU0sR0FBRyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUE7d0JBQzNELHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQXZDLFVBQVUsR0FBRyxTQUEwQjt3QkFFaEMscUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBQTs7d0JBQTdCLElBQUksR0FBRyxTQUFzQjs2QkFFL0IsQ0FBQSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQSxFQUFqQix3QkFBaUI7d0JBQ2pCLHFCQUFNLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUE7O3dCQUEvQixTQUErQixDQUFDOzs0QkFFaEMscUJBQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQTs7d0JBQWpELFNBQWlELENBQUE7Ozs7OztLQUV4RDtJQUVZLGNBQU0sR0FBbkIsVUFBb0IsTUFBYzs7Ozs0QkFDOUIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUE7O3dCQUF2QyxTQUF1QyxDQUFDOzs7OztLQUMzQztJQTVFTSxXQUFHLEdBQUcscUJBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0lBQ3ZCLFVBQUUsR0FBRyxxQkFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDckIsdUJBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsYUFBSyxHQUFvQixJQUFJLENBQUM7SUFDOUIsa0JBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQXlFbkMsY0FBQztDQUFBLEFBOUVELElBOEVDO0FBOUVxQiwwQkFBTyJ9