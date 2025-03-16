import axios from "axios";

// Change ip based on network
export default axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
});
