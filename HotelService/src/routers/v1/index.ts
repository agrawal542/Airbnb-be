import exprss from "express";
import pingRouter from "./ping.router";
import hotelRouter from "./hotel.router";
import roomGenerationRouter from "./roomGeneration.router";

const v1Router = exprss.Router();


v1Router.use('/ping', pingRouter)
v1Router.use('/hotel', hotelRouter)
v1Router.use('/room-generation', roomGenerationRouter)

export default v1Router;
