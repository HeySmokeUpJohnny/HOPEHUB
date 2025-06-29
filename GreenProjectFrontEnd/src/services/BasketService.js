import axios from "axios";

const serviceUrl = "http://localhost:8040/basket"
const gatewayServiceUrl = "http://localhost:8072/ael/basketservice/basket"



    //`${serviceUrl}/basketProductListing/${customerId}


export const getBasketCustomerById = async(customerId) => {
    const response = await axios.get(`http://localhost:8072/ael/basketservice/basket/basketProductListing/${customerId}`,{
        withCredentials: true,
    });
    localStorage.setItem("customerBasketId",response.data.basketId);
    //console.log(response.data);
    return response.data;
}

export const getBasketBasketById = async(basketId) => {
    const response = await axios.get(`${serviceUrl}/getBasketProductUnitByBasketId/${basketId}`);
    //console.log(response.data);
    return response.data;
}


export const deleteProductFromBasket = async(productId) => {
    const basketId = localStorage.getItem("customerBasketId");
    const response = await axios.get(`${gatewayServiceUrl}/removeProductFromBasket/${basketId}/${productId}`,{
        withCredentials: true, // <-- BU SATIR ÇOK ÖNEMLİ!
    });

    return response.data;
}

export const addProductToBasket = async(productId) => {
    const customerId = localStorage.getItem("customerId");
    const response = await axios.get(`${gatewayServiceUrl}/addProductToCustomerBasket/${customerId}/${productId}`,{
        withCredentials: true, // <-- BU SATIR ÇOK ÖNEMLİ!
    });
    //console.log(response.data);
    return response.data;
}


export const decrementProductFromBasket = async(basketProductUnitId) => {
    return await axios.put(`${gatewayServiceUrl}/decrementProductQuantity/${basketProductUnitId}`,{},{
        withCredentials: true// <-- BU SATIR ÇOK ÖNEMLİ!
    });
}

export const incrementProductFromBasket = async(basketProductUnitId) => {
    return await axios.put(`${gatewayServiceUrl}/incrementProductQuantity/${basketProductUnitId}`,{},{
        withCredentials: true // <-- BU SATIR ÇOK ÖNEMLİ!
    });
}

