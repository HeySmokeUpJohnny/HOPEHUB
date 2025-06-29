import axios from "axios";

const gatewayServiceUrl = "http://localhost:8072/ael/authservice"


export const authLogin = async (data) => {
        const response = await axios.post(`${gatewayServiceUrl}/auth/login`, data,{ withCredentials: true });
        console.log(response)
        localStorage.setItem("activeBasketId",response.data.activeBasketId);
        localStorage.setItem("customerId",response.data.customerId);
        console.log("Giriş başarılı, token:", response.data.accessToken);
        return response;
};



export const authRegister = async (data) => {
        const response = await axios.post(`${gatewayServiceUrl}/auth/register`, data,{ withCredentials: true });
        console.log(response)
        return response;
};


export const authLogout = () =>{

}