import express from 'express';
import { validateRequestBody } from '../../validators';
import { confirmBookingHandler, createBookingHandler } from '../../controllers/booking.controller';
import { createBookingSchema } from '../../validators/booking.validator';

const bookingRouter = express.Router();

bookingRouter.post('/', validateRequestBody(createBookingSchema), createBookingHandler);
bookingRouter.post('/confirm/:idempotencyKey', confirmBookingHandler);


export default bookingRouter;