"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import config from "../config/config";
exports.checkJwt = function (req, res, next) {
    // //Get the jwt token from the head
    // const token = <string>req.headers["auth"];
    // let jwtPayload;
    // //Try to validate the token and get data
    // try {
    //   jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    //   res.locals.jwtPayload = jwtPayload;
    // } catch (error) {
    //   //If token is not valid, respond with 401 (unauthorized)
    //   res.status(401).send();
    //   return;
    // }
    // //The token is valid for 1 hour
    // //We want to send a new token on every request
    // const { userId, username } = jwtPayload;
    // const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
    //   expiresIn: "1h"
    // });
    // res.setHeader("token", newToken);
    // //Call the next middleware or controller
    // next();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tKd3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzZXJ2ZXIvc3JjL21pZGRsZXdhcmVzL2NoZWNrSnd0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEseUNBQXlDO0FBRTVCLFFBQUEsUUFBUSxHQUFHLFVBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQjtJQUN0RSxvQ0FBb0M7SUFDcEMsNkNBQTZDO0lBQzdDLGtCQUFrQjtJQUVsQiwyQ0FBMkM7SUFDM0MsUUFBUTtJQUNSLDJEQUEyRDtJQUMzRCx3Q0FBd0M7SUFDeEMsb0JBQW9CO0lBQ3BCLDZEQUE2RDtJQUM3RCw0QkFBNEI7SUFDNUIsWUFBWTtJQUNaLElBQUk7SUFFSixrQ0FBa0M7SUFDbEMsaURBQWlEO0lBQ2pELDJDQUEyQztJQUMzQyxzRUFBc0U7SUFDdEUsb0JBQW9CO0lBQ3BCLE1BQU07SUFDTixvQ0FBb0M7SUFFcEMsMkNBQTJDO0lBQzNDLFVBQVU7QUFDWixDQUFDLENBQUMifQ==