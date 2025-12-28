export type CreateBookingDTO = {
    userId: number;
    hotelId: number;
    roomCategoryId: number;
    totalGuests: number;
    bookingAmount: number;
    checkInDate: Date;
    checkOutDate: Date
}