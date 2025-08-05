
import { CreateRoomCategoryDTO } from "../dto/roomCategory.dto";
import { HotelRepository } from "../repositories/hotel.repository";
import { RoomCategoryRepository } from "../repositories/roomCategory";
import { NotFoundError } from "../utils/errors/app.error";


const roomCategoryRepository = new RoomCategoryRepository();
const hotelRepository = new HotelRepository();


export async function createRoomCategoryService(roomCategoryData: CreateRoomCategoryDTO) {
    const roomCategory = await roomCategoryRepository.create(roomCategoryData);
    return roomCategory;
}

export async function getRoomCategoryByIdService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    return roomCategory;
}

export async function getAllRoomCategoriesServiceByhotelIdService(hotel_id: number) {
    const hotel = await hotelRepository.findById(hotel_id);
    if (!hotel) {
        throw new NotFoundError(`Hotel with id ${hotel_id} not found`)
    }

    const roomCategories = await roomCategoryRepository.findAlLByHotelId(hotel_id);
    return roomCategories;
}


export async function deleteHotelService(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    if (!roomCategory) {
        throw new NotFoundError(`Room category with id ${id} not found`)
    }

    await hotelRepository.delete({ id });
    return true;
}