import logger from "../config/logger.config";
import RoomCategory from "../db/models/roomCategory";
import { NotFoundError } from "../utils/errors/app.error";
import BaseRepository from "./base.repository";

export class RoomCategoryRepository extends BaseRepository<RoomCategory> {
    constructor() {
        super(RoomCategory);
    }

    async findAlLByHotelId(hotel_id: number) {
        const roomCategories = await this.model.findAll({
            where: {
                hotel_id: hotel_id,
                deleted_at: null
            }
        });

        if (!roomCategories || roomCategories.length == 0) {
            throw new NotFoundError(`No room Categories found for hotel with id ${hotel_id}`);
        }
        return roomCategories;
    }

}