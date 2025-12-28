import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getAvailableRoomsService, updateBookingIdForRoomsService } from "../services/room.service";
import { GetAvaiableRoomsDTO } from "../dto/room.dto";


export async function getAvaiableRoomsHandler(req: Request, res: Response) {

    const rooms = await getAvailableRoomsService({
        roomCategoryId: Number(req.query.roomCategoryId),
        checkInDate: String(req.query.checkInDate),
        checkOutDate: String(req.query.checkOutDate),
    } as GetAvaiableRoomsDTO)

    res.status(StatusCodes.OK).json({
        message: "Room found successfully.",
        success: true,
        data: rooms,
    })
}

export async function updateBookingRoomsHandler(req: Request, res: Response) {

    await updateBookingIdForRoomsService(req.body);

    res.status(StatusCodes.OK).json({
        message: "Rooms booked successfully.",
        success: true,
    });
}