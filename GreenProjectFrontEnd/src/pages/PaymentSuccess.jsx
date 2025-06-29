import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donationCount = location.state?.count || 0;

    const handleGoHome = () => {
        navigate('/');
    };

    const handleViewOrders = () => {
        navigate('/orders');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Ana Başarı Kartı */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center relative overflow-hidden">
                    {/* Arka Plan Dekoratif Elementleri */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500"></div>
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-green-100 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-emerald-100 rounded-full opacity-50"></div>

                    {/* Başarı İkonu */}
                    <div className="relative z-10 mb-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Başlık */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Ödeme Başarılı!
                    </h1>

                    {/* Alt Başlık */}
                    <p className="text-gray-600 mb-6">
                        Siparişiniz başarıyla alındı ve işleme alındı.
                    </p>

                    {/* Bağış Bilgisi */}
                    {donationCount > 0 && (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                </svg>
                                <span className="text-green-800 font-medium">
                                    {donationCount} fidan bağışı yapıldı
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Bilgi Kartları */}
                    <div className="space-y-3 mb-8">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700">Ödeme Durumu</span>
                            </div>
                            <span className="text-sm font-medium text-green-600">Onaylandı</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                    </svg>
                                </div>
                                <span className="text-sm text-gray-700">Teslimat</span>
                            </div>
                            <span className="text-sm font-medium text-blue-600">Hazırlanıyor</span>
                        </div>
                    </div>

                    {/* Butonlar */}
                    <div className="space-y-3">
                        <button
                            onClick={handleViewOrders}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Siparişlerimi Görüntüle
                        </button>

                        <button
                            onClick={handleGoHome}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Ana Sayfaya Dön
                        </button>
                    </div>

                    {/* Alt Bilgi */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                            Sipariş detayları e-posta adresinize gönderilecektir.
                        </p>
                    </div>
                </div>

                {/* Ek Bilgi Kartı */}
                <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Sipariş Takibi</h3>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                        <p>• Sipariş numaranız e-posta ile gönderilecek</p>
                        <p>• Kargo takibi için SMS bilgilendirmesi alacaksınız</p>
                        <p>• Sorularınız için müşteri hizmetlerimiz 7/24 hizmetinizde</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;