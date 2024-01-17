import { API_BASE_URL } from "./app";
// axios config with base url of our api exported from teh config file
import a from "axios";

const axios = a.create({
    baseURL: API_BASE_URL,
});

export default axios;
