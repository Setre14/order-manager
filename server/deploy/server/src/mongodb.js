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
var config_1 = require("./config/config");
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
    MongoDB.URL = config_1.Config.getMongoDBUrl();
    MongoDB.DB = config_1.Config.getMongoDBName();
    MongoDB.COLLECTION_NAME = 'colName';
    MongoDB.INDEX = null;
    MongoDB.PROJECTION = { _id: 0 };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29kYi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNlcnZlci9zcmMvbW9uZ29kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUE0QjtBQUM1QiwwQ0FBeUM7QUFFekM7SUFBQTtJQThFQSxDQUFDO0lBckVnQixpQkFBUyxHQUF0Qjs7Ozs0QkFDVyxxQkFBTSxpQkFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQTs0QkFBckUsc0JBQU8sU0FBOEQsRUFBQTs7OztLQUN4RTtJQUVZLGFBQUssR0FBbEI7Ozs7OzRCQUNtQixxQkFBTSxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUE7O3dCQUFsQyxNQUFNLEdBQUcsU0FBeUI7d0JBQ3hDLHNCQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFDOzs7O0tBQ2hDO0lBRVkscUJBQWEsR0FBMUI7Ozs7Ozt3QkFDSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFOzRCQUMvQixzQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFDO3lCQUMxQjt3QkFFVSxxQkFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUE7O3dCQUExQixFQUFFLEdBQUcsU0FBcUI7d0JBQ2IscUJBQU0sRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBQTs7d0JBQTVELFVBQVUsR0FBRyxTQUErQzt3QkFFbEUscUJBQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7d0JBRW5DLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO3dCQUM3QixzQkFBTyxJQUFJLENBQUMsVUFBVSxFQUFDOzs7O0tBQzFCO0lBRVksY0FBTSxH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