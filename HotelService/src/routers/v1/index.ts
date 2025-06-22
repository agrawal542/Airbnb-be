import exprss from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel.router";

const v1Router = exprss.Router();


v1Router.use('/ping', pingRouter)
v1Router.use('/hotel', hotelRouter)


export default v1Router;
