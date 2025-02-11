import axios from "axios";

// Change ip based on network

export default axios.create({
	baseURL: "http://192.168.138.137:8000/api",
});
