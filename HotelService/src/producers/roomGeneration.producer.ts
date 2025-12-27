import { RoomGenerationJob } from "../dto/roomCategory.dto";
import { roomGenerationQueue } from "../queues/roomgeneration.queue";


export const ROOM_GENERATION_PAYLOAD = "payload:room-generation";

export const addRoomGenerationJobToQueue = async (payload: RoomGenerationJob) => {
    await roomGenerationQueue.add(ROOM_GENERATION_PAYLOAD, payload);
}