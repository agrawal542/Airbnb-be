import prismaClient from '../prisma/client';
import { CreateBookingDTO } from "../dto/booking.dto";
import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKeyWithLock } from "../repositories/booking.repository";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { serverConfig } from '../config';
import { redlock } from '../config/redis.config';
import { getAvailableRooms, updateBookingIdForRooms } from '../api/hotel.api';


export async function createBookingService(createBookingDTO: CreateBookingDTO) {

    const ttl = serverConfig.LOCK_TTL;
    const bookingResource = `hotel:${createBookingDTO.hotelId}`;

    try {
        await redlock.acquire([bookingResource], ttl);

        const availableRooms = await getAvailableRooms(
            createBookingDTO.roomCategoryId,
            createBookingDTO.checkInDate,
            createBookingDTO.checkOutDate
        );

        const checkoutDate = new Date(createBookingDTO.checkOutDate);
        const checkinDate = new Date(createBookingDTO.checkInDate);

        const totalNights = Math.ceil((checkoutDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));

        if (availableRooms.length === 0 || availableRooms.data.length < totalNights) {
            throw new BadRequestError('No rooms available for the selected category and dates');
        }

        const booking = await createBooking({
            userId: createBookingDTO.userId,
            hotelId: createBookingDTO.hotelId,
            totalGuests: createBookingDTO.totalGuests,
            bookingAmount: createBookingDTO.bookingAmount,
            roomCategoryId: createBookingDTO.roomCategoryId,
            checkInDate: new Date(createBookingDTO.checkInDate),
            checkOutDate: new Date(createBookingDTO.checkOutDate)
        });

        console.log("Created Booking:", booking);

        const idempotencyKey = generateIdempotencyKey();

        await createIdempotencyKey(idempotencyKey, booking.id);

        console.log("Associating rooms with booking ID:", booking.id, "Rooms:", availableRooms);

        await updateBookingIdForRooms(booking.id, availableRooms.data.map((room: any) => room.id));

        return {
            bookingId: booking.id,
            idempotencyKey: idempotencyKey,
        };
    } catch (error: any) {
        throw new InternalServerError(error.message);
    }
}

export async function confirmBookingService(idempotencyKey: string) {
    return await prismaClient.$transaction(async (tx) => {

        const idempotencyKeyData = await getIdempotencyKeyWithLock(tx, idempotencyKey);

        if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
            throw new NotFoundError('Idempotency key not found');
        }

        if (idempotencyKeyData.finalized) {
            throw new BadRequestError('Idempotency key already finalized');
        }

        const booking = await confirmBooking(tx, idempotencyKeyData.bookingId);
        await finalizeIdempotencyKey(tx, idempotencyKey);

        return booking;
    });
}