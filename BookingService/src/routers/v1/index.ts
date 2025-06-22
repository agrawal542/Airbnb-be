import exprss from "express";
import pingRouter from "./ping.router";
import bookingRouter from "./booking.router";

const v1Router = exprss.Router();


v1Router.use('/ping', pingRouter)
v1Router.use('/booking', bookingRouter)

export default v1Router;
