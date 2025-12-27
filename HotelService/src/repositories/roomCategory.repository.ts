import logger from "../config/logger.config";
import RoomCategory from "../db/models/roomCategory";
import { NotFoundError } from "../utils/errors/app.error";
import BaseRepository from "./base.repository";

export class RoomCategoryRepository extends BaseRepository<RoomCategory> {
    constructor() {
        super(RoomCategory);
    }
}