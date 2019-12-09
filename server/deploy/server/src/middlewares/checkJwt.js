"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = __importStar(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
exports.checkJwt = function (req, res, next) {
    //Get the jwt token from the head
    var token = req.headers["auth"];
    var jwtPayload;
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config_1.default.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send();
        return;
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    var userId = jwtPayload.userId, username = jwtPayload.username;
    var newToken = jwt.sign({ userId: userId, username: username }, config_1.default.jwtSecret, {
        expiresIn: "1h"
    });
    res.setHeader("token", newToken);
    //Call the next middleware or controller
    next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tKd3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL21pZGRsZXdhcmVzL2NoZWNrSnd0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLGdEQUFvQztBQUNwQyw0REFBc0M7QUFFekIsUUFBQSxRQUFRLEdBQUcsVUFBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCO0lBQ3RFLGlDQUFpQztJQUNqQyxJQUFNLEtBQUssR0FBVyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLElBQUksVUFBVSxDQUFDO0lBRWYsd0NBQXdDO0lBQ3hDLElBQUk7UUFDRixVQUFVLEdBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsZ0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FDcEM7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLHdEQUF3RDtRQUN4RCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE9BQU87S0FDUjtJQUVELCtCQUErQjtJQUMvQiw4Q0FBOEM7SUFDdEMsSUFBQSwwQkFBTSxFQUFFLDhCQUFRLENBQWdCO0lBQ3hDLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLFFBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxFQUFFLGdCQUFNLENBQUMsU0FBUyxFQUFFO1FBQ2hFLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUMsQ0FBQztJQUNILEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWpDLHdDQUF3QztJQUN4QyxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQyJ9