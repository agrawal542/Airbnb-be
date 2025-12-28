
import axios from 'axios';
import { serverConfig } from '../config';

export const getAvailableRooms = async (roomCategoryId: number, checkInDate: Date, checkOutDate: Date) => {

    const response = await axios.get(`${serverConfig.HOTEL_SERVICE_URL}/room/available`, {
        params: {
            roomCategoryId,
            checkInDate,
            checkOutDate
        }
    });
    return response.data ;
}

export const updateBookingIdForRooms = async (bookingId: number, roomIds: number[]) => {
    console.log("Updating rooms with booking ID:", bookingId, "for room IDs:", roomIds);
    const response = await axios.post(`${serverConfig.HOTEL_SERVICE_URL}/room/update-booking-id`, {
        bookingId,
        roomIds
    });
    return response.data;

}