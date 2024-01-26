// axios config with base url of our api exported from teh config file
import a from "axios";

const API_BASE_URL = process.env.BACKEND_URL;

// if (typeof window === undefined) {
//     (async () => {
//         const dns = await import("dns");
//         dns.setDefaultResultOrder("ipv4first");
//     })();
// }

const axios = a.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

export default axios;
