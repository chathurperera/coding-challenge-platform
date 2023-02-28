import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5000/api/'
})

export const axiosPrivate = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: { "Content-Type": "application/json" }
});

axiosPrivate.interceptors.request.use(
    (config) => {
        let user = localStorage.getItem("user")
        user = JSON.parse(user);
        config.headers["Authorization"] = `Bearer ${user.token}`;

        return config;
    },
    (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
    (response) => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            localStorage.removeItem('user');
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);