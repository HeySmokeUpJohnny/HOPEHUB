import axios from 'axios';

const gatewayServiceUrl = "http://localhost:8072/ael/productservice/category"

export const getAllCategories = async () => {
    return await axios.get(`${gatewayServiceUrl}/getAllCategories`,{ withCredentials: true });
}
