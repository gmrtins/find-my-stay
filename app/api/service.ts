import axios from "axios";
import { IHotel } from "../types";

const BASE_URL = "https://technology.lastminute.com/api/hotel.json";

export const fetchData = async (): Promise<IHotel[]> => {
    try {
        const response = await axios.get<IHotel[]>(`${BASE_URL}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
