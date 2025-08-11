import axios from "axios";
import { env, reviveDates } from "@/utils/functions";

export const api = axios.create({
	baseURL: env().VITE_API_URL,
});

api.interceptors.response.use((response) => {
	response.data = reviveDates(response.data);
	return response;
});
