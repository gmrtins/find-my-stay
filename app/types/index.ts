export interface ILocation {
    address: string;
    city: string;
    latitude: number;
    longitude: number;
}

export interface ICheckInOut {
    from: string;
    to: string;
}

export interface IContact {
    phoneNumber: string;
    email: string;
}

export interface IHotel {
    id: number;
    name: string;
    location: ILocation;
    stars: number;
    checkIn: ICheckInOut;
    checkOut: ICheckInOut;
    contact: IContact;
    gallery: string[];
    userRating: number;
    price: number;
    currency: string;
}

export type HotelDetailsParams = {
    name: string;
    data: string;
};