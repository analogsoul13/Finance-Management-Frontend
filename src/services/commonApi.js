import axios from "axios";

const commonApi = async (reqUrl, reqMethod, reqHeader = {}, reqBody) => {
    try {
        const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage

        const headers = {
            'Content-Type': 'application/json',
            ...reqHeader, // Merge additional headers if provided
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`; // Add Authorization header if token exists
        }

        const config = {
            url: reqUrl,
            method: reqMethod,
            headers: headers,
            data: reqBody
        };

        const response = await axios(config);
        return { status: response.status, data: response.data };
    } catch (error) {
        return {
            error: true,
            status: error.response?.status || 500,
            message: error.response?.data || "Something went wrong!",
        };
    }
};

export default commonApi;
