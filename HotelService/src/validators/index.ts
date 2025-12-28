import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { BadRequestError } from "../utils/errors/app.error";
import logger from "../config/logger.config";


/**
 * 
 * @param schema - Zod schema to validate the request body
 * @returns - Middleware function to validate the request body
 */
export const validateRequestBody = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            logger.info("Request body is valid");
            next();
        } catch (error: any) {
            // If the validation fails, 
            logger.error("Request body is invalid");
            return next(new BadRequestError("Invalid request body"));
        }
    }
}

/**
 * 
 * @param schema - Zod schema to validate the request query
 * @returns - Middleware function to validate the request query params
 */
export const validateQueryParams = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.query);
            console.log("Query params are valid");
            next();
        } catch (error: any) {
            console.log(error,"---error-------")
            // If the validation fails, 
            logger.error("Query params is invalid");
            return next(new BadRequestError("Invalid query params",));
        }
    }
}