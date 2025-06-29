import axios from 'axios';

//const serviceUrl = "http://localhost:8086/payment"
const gatewayServiceUrl = "http://localhost:8072/ael/paymentservice"

export const createPayment = async (paymentRequest) => {
    const payment = await axios.post(`${gatewayServiceUrl}/payment/createPayment`, paymentRequest,{ withCredentials: true });
    return payment;
}

export const getDonation = async (userId) => {
    const donation = await axios.get(`${gatewayServiceUrl}/donation/getDonation/${userId}`,{ withCredentials: true });
    return donation;
}

export const toDonate = async (userId) => {
    const donation = await axios.get(`${gatewayServiceUrl}/donation/toDonate/${userId}`,{ withCredentials: true });
    return donation;
}

export const getActiveCoupons = async (userId) => {
    // Bu endpoint'in doğru olduğundan emin ol
    try{
        const response = await axios.get(`${gatewayServiceUrl}/coupon/getCoupon/${userId}`, { withCredentials: true });
        return response.data;
    }
    catch(e){
        console.log(e);
    }

};