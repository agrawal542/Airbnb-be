import express from 'express';

import { getAvaiableRoomsHandler, updateBookingRoomsHandler } from '../../controllers/room.controller';
import { getAvailableRoomsSchema, updateBookingIdForRoomsSchema } from '../../validators/room.validator';
import { validateQueryParams, validateRequestBody } from '../../validators';


const roomRouter = express.Router();


roomRouter.get('/available', validateQueryParams(getAvailableRoomsSchema), getAvaiableRoomsHandler);
roomRouter.post('/update-booking-id', validateRequestBody(updateBookingIdForRoomsSchema), updateBookingRoomsHandler)



export default roomRouter;