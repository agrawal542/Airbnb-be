import { NextFunction, Request, Response } from "express"
import { InternalServerError } from "../utils/errors/app.error";


export const pingHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        res.status(200).json({ message: "Pong!" });
    } catch (error) {
        return next(new InternalServerError("Something went wrong while executing the ping handler."));
    }
}