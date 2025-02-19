import base_url from "./base_url";
import commonApi from "./commonApi";

// User Authentication
export const registerApi = async (data) => {
    return await commonApi(`${base_url}/user/register`, "POST", "", data)
}

export const loginApi = async (data) => {
    return await commonApi(`${base_url}/user/login`, "POST", "", data)
}

// Transactions
export const addTransactionApi = async (data) => {
    return await commonApi(`${base_url}/transactions`, "POST","", data)
}

export const fetchTransactionsApi = async () => {
    return await commonApi(`${base_url}/transactions`, "GET","")
}