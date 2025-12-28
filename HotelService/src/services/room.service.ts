import { createHotelDTO } from "../dto/hotel.dto";
import { GetAvaiableRoomsDTO, UpdateBookingIdForRoomsDTO } from "../dto/room.dto";
import { RoomRepository } from "../repositories/room.repository";


const roomRepository = new RoomRepository();

export async function getAvailableRoomsService(getAvailableRoomsDTO: GetAvaiableRoomsDTO) {
    return await roomRepository.findByRoomCategoryIdAndDateRange(
        getAvailableRoomsDTO.roomCategoryId,
        new Date(getAvailableRoomsDTO.checkInDate),
        new Date(getAvailableRoomsDTO.checkOutDate));
}

export async function updateBookingIdForRoomsService(updateBookingIdForRoomsDTO: UpdateBookingIdForRoomsDTO) {
    return await roomRepository.updateBookingIdForRooms(updateBookingIdForRoomsDTO.bookingId, updateBookingIdForRoomsDTO.roomIds);
}   