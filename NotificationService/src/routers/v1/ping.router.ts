import express, { NextFunction, Request, Response } from 'express';
import { pingHandler } from "../../controllers/ping.controller";
import { pingSchema } from '../../validators/ping.validator';
import { validateQueryParams, validateRequestBody } from '../../validators';

const pingRouter = express.Router();


pingRouter.get('/', validateRequestBody(pingSchema), validateQueryParams(pingSchema), pingHandler)



export default pingRouter;
