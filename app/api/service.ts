import axios from "axios";
import { IHotel } from "../types";

const BASE_URL = "https://technology.lastminute.com/api/hotel.json";

export const fetchData = async (): Promise<IHotel[]> => {
    const mock = {
        hotels: [
            {
                id: 1,
                name: "Grand Luxe Hotel",
                location: {
                    address: "123 Luxury Ave",
                    city: "Paris",
                    latitude: 48.8566,
                    longitude: 2.3522,
                },
                stars: 5,
                checkIn: {
                    from: "15:00",
                    to: "23:59",
                },
                checkOut: {
                    from: "06:00",
                    to: "11:00",
                },
                contact: {
                    phoneNumber: "+33 1 23 45 67 89",
                    email: "contact@grandluxeparis.com",
                },
                gallery: [
                    "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                userRating: 4.8,
                price: 450,
                currency: "EUR",
            },
            {
                id: 2,
                name: "Coastal Escape Resort",
                location: {
                    address: "789 Ocean Breeze Blvd",
                    city: "Malibu",
                    latitude: 34.0259,
                    longitude: -118.7798,
                },
                stars: 4,
                checkIn: {
                    from: "14:00",
                    to: "22:00",
                },
                checkOut: {
                    from: "07:00",
                    to: "12:00",
                },
                contact: {
                    phoneNumber: "+1 310 555 1234",
                    email: "info@coastalescapemalibu.com",
                },
                gallery: [
                    "https://images.pexels.com/photos/594077/pexels-photo-594077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/172872/pexels-photo-172872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                    "https://images.pexels.com/photos/2883047/pexels-photo-2883047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                ],
                userRating: 4.5,
                price: 320,
                currency: "USD",
            },
        ],
    };

    try {
        const response = await axios.get<IHotel[]>(`${BASE_URL}`);
        return [...response.data, ...mock.hotels].sort((a, b) => a.id - b.id);
    } catch (error) {
        throw new Error(error.message);
    }
};
