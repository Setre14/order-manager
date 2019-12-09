"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
                    case 0: return [4 /*yield*/, this.getCollection()];
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
                    case 0: return [4 /*yield*/, this.getCollection()];
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
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCollection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection.updateOne(filter, { $set: obj })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MongoDB.URL = "mongodb://18.197.52.23:27017/";
    MongoDB.DB = 'order-manager';
    MongoDB.COLLECTION_NAME = 'colName';
    MongoDB.INDEX = null;
    MongoDB.PROJECTION = { _id: 0 };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbW9uZ29kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUU1QjtJQUFBO0lBaUVBLENBQUM7SUF4RGdCLGlCQUFTLEdBQXRCOzs7OzRCQUNXLHFCQUFNLGlCQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFBOzRCQUFyRSxzQkFBTyxTQUE4RCxFQUFBOzs7O0tBQ3hFO0lBRVksYUFBSyxHQUFsQjs7Ozs7NEJBQ21CLHFCQUFNLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBQTs7d0JBQWxDLE1BQU0sR0FBRyxTQUF5Qjt3QkFDeEMsc0JBQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUM7Ozs7S0FDaEM7SUFFWSxxQkFBYSxHQUExQjs7Ozs7O3dCQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQUU7NEJBQy9CLHNCQUFPLElBQUksQ0FBQyxVQUFVLEVBQUM7eUJBQzFCO3dCQUVVLHFCQUFNLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQTFCLEVBQUUsR0FBRyxTQUFxQjt3QkFDYixxQkFBTSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFBOzt3QkFBNUQsVUFBVSxHQUFHLFNBQStDO3dCQUVsRSxxQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFBOzt3QkFBbEMsU0FBa0MsQ0FBQzt3QkFFbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7d0JBQzdCLHNCQUFPLElBQUksQ0FBQyxVQUFVLEVBQUM7Ozs7S0FDMUI7SUFFWSxjQUFNLEdBQW5COzs7OzRCQUNXLHFCQUFNLElBQUksQ0FBQyxHQUFHLENBQUksRUFBRSxDQUFDLEVBQUE7NEJBQTVCLHNCQUFPLFNBQXFCLEVBQUE7Ozs7S0FDL0I7SUFFWSxXQUFHLEdBQWhCLFVBQW9CLE1BQWM7Ozs7OzRCQUNYLHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQXZDLFVBQVUsR0FBRyxTQUEwQjt3QkFFN0Msc0JBQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUM7Ozs7S0FDN0U7SUFFWSxjQUFNLEdBQW5CLFVBQW9CLEdBQVc7Ozs7OzRCQUNSLHFCQUFNLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQTs7d0JBQXZDLFVBQVUsR0FBRyxTQUEwQjt3QkFFN0MscUJBQU0sVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQTs7d0JBQXZDLFNBQXVDLENBQUE7Ozs7O0tBQzFDO0lBRVksbUJBQVcsR0FBeEIsVUFBeUIsVUFBNEI7Ozs7OzRCQUNsQyxxQkFBTSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUE7O3dCQUE1RCxNQUFNLEdBQUcsU0FBbUQ7d0JBRWxFLElBQUksTUFBTSxFQUFFOzRCQUNSLHNCQUFPO3lCQUNWO3dCQUNELHFCQUFNLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBQTs7d0JBQTlCLFNBQThCLENBQUM7NkJBQzNCLENBQUEsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUEsRUFBbkIsd0JBQW1CO3dCQUNuQixxQkFBTSxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUE7O3dCQUF2RixTQUF1RixDQUFDOzs7Ozs7S0FFL0Y7SUFFWSxjQUFNLEdBQW5CLFVBQW9CLE1BQWMsRUFBRSxHQUFXOzs7Ozs0QkFDeEIscUJBQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFBOzt3QkFBdkMsVUFBVSxHQUFHLFNBQTBCO3dCQUU3QyxxQkFBTSxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFBOzt3QkFBakQsU0FBaUQsQ0FBQTs7Ozs7S0FDcEQ7SUEvRE0sV0FBRyxHQUFHLCtCQUErQixDQUFDO0lBQ3RDLFVBQUUsR0FBRyxlQUFlLENBQUM7SUFDckIsdUJBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsYUFBSyxHQUFvQixJQUFJLENBQUM7SUFDOUIsa0JBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQTREbkMsY0FBQztDQUFBLEFBakVELElBaUVDO0FBakVxQiwwQkFBTyJ9