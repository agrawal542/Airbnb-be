import { RoomType } from "../db/models/roomCategory";

export type CreateRoomCategoryDTO = {
    hotel_id: number;
    price: number;
    room_type: RoomType;
    room_count: number;
};
