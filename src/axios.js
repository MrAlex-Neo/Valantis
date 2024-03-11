import axios from "axios";
import md5 from "md5";

const instance = axios.create({
    baseURL: 'https://api.valantis.store:41000/'
});

instance.interceptors.request.use((config) => {
    const stamp = new Date().toISOString().slice(0,10).replace(/-/g,"");
    const hash = md5(`Valantis_${stamp}`);
    config.headers["X-Auth"] = hash;
    return config;
});

// function getCurrentDate() {
//     const currentDate = new Date();
//     const year = currentDate.getUTCFullYear();
//     const month = (currentDate.getUTCMonth() + 1).toString().padStart(2, '0');
//     const day = currentDate.getUTCDate().toString().padStart(2, '0');

//     return `${year}${month}${day}`;
// }

export default instance;
