import { CreationAttributes } from "sequelize";
import Room from "../db/models/room";
import BaseRepository from "./base.repository";

export class RoomRepository extends BaseRepository<Room> {
    constructor() {
        super(Room);
    }

    async findByRoomCategoryIdAndDate(
        roomCategoryId: number,
        currentDate: Date
    ) {
        return await this.model.findOne({
            where: {
                room_category_id: roomCategoryId,
                date_of_availability: currentDate,
                deleted_at: null
            }
        })
    }

    async bulkCreate(rooms: CreationAttributes<Room>[]) {
        return await this.model.bulkCreate(rooms);
    }

    async findLatestDateByRoomCategoryId(roomCategoryId: number): Promise<Date | null> {
        const result = await this.model.findOne({
            where: {
                room_category_id: roomCategoryId,
                deleted_at: null
            },
            attributes: ['date_of_availability'],
            order: [['date_of_availability', 'DESC']]
        });

        return result ? result.date_of_availability : null;
    }

    async findLatestDatesForAllCategories(): Promise<Array<{ roomCategoryId: number, latestDate: Date }>> {
        const results = await this.model.findAll({
            where: {
                deleted_at: null
            },
            attributes: [
                'room_category_id',
                [this.model.sequelize!.fn('MAX', this.model.sequelize!.col('date_of_availability')), 'latestDate']
            ],
            group: ['room_category_id'],
            raw: true
        });

        return results.map((result: any) => ({
            roomCategoryId: result.room_category_id,
            latestDate: new Date(result.latestDate)
        }));
    }
}