import React, {useEffect, useState} from 'react';
import {getBasketCustomerById, deleteProductFromBasket ,incrementProductFromBasket,decrementProductFromBasket} from "../services/BasketService.js";

import {routes} from "../routes/Routes.js";
import {useNavigate} from "react-router-dom";


const Basket = () => {
    const [basket, setBasket] = useState([]);
    const [basketId, setBasketId] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {

        const basketResponse = async () => {
            const basketResponse = await getBasketCustomerById(localStorage.getItem("customerId"));
            //console.log(basketResponse);
            setBasketId(localStorage.getItem('customerBasketId'))
            setBasket(basketResponse.basketProducts)
            setSubTotal(basketResponse.basketProducts.reduce((totalPrice,product)=>totalPrice + product.productQuantity * product.productPrice,0).toFixed(2))
        }

        basketResponse()





    }, []);

    useEffect(() => {
        setSubTotal(basket.reduce((totalPrice,product)=>totalPrice + product.productQuantity * product.productPrice,0).toFixed(2))
    }, [basket]);



    const handleDeleteProductFromBasket = async (productId) => {
        await deleteProductFromBasket(productId);
        const newBasket = basket.filter((item) => item.productId !== productId);
        setBasket(newBasket);
    }


    const handleReadyForCheckout =  () => {
        navigate(routes.Payment,{state: {basket,subTotal,basketId}});
    }

    const handleIncrementProductFromBasket = async(basketProductUnitId) => {
        await incrementProductFromBasket(basketProductUnitId);
        setBasket(basket.map((item) => item.basketProductUnitId == basketProductUnitId ? {...item,productQuantity: item.productQuantity+1}  : item ));

    }

    const handleDecrementProductFromBasket = async(basketProductUnitId) => {
        await decrementProductFromBasket(basketProductUnitId);
        setBasket(basket.map((item) => item.basketProductUnitId == basketProductUnitId ? {...item,productQuantity: item.productQuantity-1}  : item ).filter((item) => item.productQuantity > 0));

    }

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Sepetim</h2>

            {basket.length === 0 ? (
                <div className="text-center py-12">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                    </svg>
                    <p className="mt-4 text-gray-500">Sepetiniz boş</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm">
                            {basket.map((item, index) => (
                                <div key={index} className="flex items-center p-4 border-b last:border-b-0">
                                    <div className="w-24 h-24 flex-shrink-0">
                                        <img
                                            src={item.productImageUrl}
                                            className="w-full h-full object-cover rounded"
                                        />
                                    </div>
                                    <div className="ml-4 flex-grow">
                                        <h3 className="text-lg font-medium">{item.productName}</h3>
                                        <p>{item.productQuantity} Adet</p>
                                        <div className="flex items-center mt-2">
                                            <div className="flex items-center border rounded">
                                                <button

                                                    className="px-3 py-1 hover:bg-gray-100"
                                                    onClick={()=>handleDecrementProductFromBasket(item.basketProductUnitId)}
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1"></span>
                                                <button

                                                    className="px-3 py-1 hover:bg-gray-100"
                                                    onClick={()=>handleIncrementProductFromBasket(item.basketProductUnitId)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteProductFromBasket(item.productId)}
                                                className="ml-4 text-red-500 hover:text-red-700"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="ml-4 text-right">
                                        {item.discount > 0 && (
                                            <span className="text-gray-500 line-through text-sm block">
                                                {item.price.toFixed(2)} TL
                                            </span>
                                        )}
                                        <span className="text-lg font-semibold">
                                            {(item.productPrice * (1 - 0)).toFixed(2)} TL
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="text-lg font-semibold mb-4">Sipariş Özeti</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Ara Toplam</span>
                                    <span>{subTotal} TL</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Kargo</span>
                                    <span>Ücretsiz</span>
                                </div>
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between font-bold">
                                        <span>Toplam</span>
                                        <span>TL</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-colors"
                                onClick={()=>handleReadyForCheckout(basketId)}
                            >
                                Ödemeye Geç
                            </button>
                            <div className="mt-4 text-sm text-gray-500">
                                <p>Güvenli ödeme</p>
                                <div className="flex space-x-2 mt-2">
                                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor" strokeWidth="2"/>
                                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor" strokeWidth="2"/>
                                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="currentColor" strokeWidth="2"/>
                                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2"
                                              strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Basket;