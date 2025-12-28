import { z } from "zod";

export const getAvailableRoomsSchema = z.object({
    roomCategoryId: z.string({ message: "Room Category ID must be present" }),
    checkInDate: z.string({ message: "Check-in date must be present" }),
    checkOutDate: z.string({ message: "Check-out date must be present" }),
});

export const updateBookingIdForRoomsSchema = z.object({
    bookingId: z.number({ message: "Booking ID must be present" }),
    roomIds: z.array(z.number({ message: "Room ID must be a number" }), {
        required_error: "Room IDs must be present"
    }).min(1, { message: "At least one Room ID must be provided" }),
});