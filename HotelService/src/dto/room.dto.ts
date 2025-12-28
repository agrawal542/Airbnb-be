export type GetAvaiableRoomsDTO = {
    roomCategoryId: number,
    checkInDate: string,
    checkOutDate: string
}

export type UpdateBookingIdForRoomsDTO = {
    bookingId: number
    roomIds: number[],
}