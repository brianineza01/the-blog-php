// axios config with base url of our api exported from teh config file
import a from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

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
