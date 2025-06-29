import axios from "axios";

const gatewayServiceUrl = "http://localhost:8072/ael/productservice/product"

export const getAllProducts = async () => {
    const response = await axios.get(`${gatewayServiceUrl}/getAllProducts`,{ withCredentials: true });
    return response.data;
}

export const addProduct = async (product) => {
    return await axios.post(`${gatewayServiceUrl}/createProduct`,product,{ withCredentials: true });
}