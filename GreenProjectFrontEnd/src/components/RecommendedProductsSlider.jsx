import React, { useState, useEffect } from 'react';
import { addProductToBasket, recommendProductFromBasket } from "../services/BasketService.js";

const RecommendedProductsSlider = ({ basket }) => {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [favorites, setFavorites] = useState(new Set());
    const [currentIndex, setCurrentIndex] = useState(0);

    const productsPerPage = 5;
    const totalPages = Math.ceil(recommendedProducts.length / productsPerPage);

    useEffect(() => {
        if (basket && basket.length > 0) {
            fetchRecommendedProducts();
        }
    }, []);

    const fetchRecommendedProducts = async () => {
        try {
            const response = await recommendProductFromBasket(basket);
            setRecommendedProducts(response);
        } catch (err) {
            console.error("API'den öneri alınamadı", err);
        }
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === totalPages - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? totalPages - 1 : prevIndex - 1
        );
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    const startIndex = currentIndex * productsPerPage;
    const visibleProducts = recommendedProducts.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Size Özel Öneriler</h2>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                        {currentIndex + 1} / {totalPages}
                    </span>
                    <div className="flex space-x-2">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                            aria-label="Önceki"
                        >
                            ◀
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                            aria-label="Sonraki"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="flex space-x-6 overflow-x-auto max-w-7xl scrollbar-none">
                    {visibleProducts.map((product) => {
                        const originalPrice = product.product_price;
                        const isDiscounted = product.discountPercentage && product.discountPercentage > 0;
                        const discountedPrice = isDiscounted
                            ? originalPrice * (1 - product.discountPercentage / 100)
                            : originalPrice;

                        return (
                            <div key={product.product_id} className="relative w-80 h-96 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex-shrink-0">
                                {/* Yeni Etiket */}
                                {product.isNew && (
                                    <div className="absolute top-3 right-3 z-10">
                                        <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">YENİ</span>
                                    </div>
                                )}

                                {/* Ürün Görseli */}
                                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-center">
                                            <svg className="w-12 h-12 mx-auto text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-gray-500 text-sm">Ürün Görseli</span>
                                        </div>
                                    </div>

                                    {isDiscounted && (
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                                                %{product.discountPercentage} İNDİRİM
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Ürün Bilgileri */}
                                <div className="p-4 h-48 flex flex-col">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-shrink-0">
                                        {product.product_name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                                        {product.product_description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center space-x-2">
                                            {isDiscounted ? (
                                                <>
                                                    <span className="text-lg font-bold text-red-600">
                                                        ₺{discountedPrice.toFixed(2)}
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ₺{originalPrice.toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₺{originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>

                                        {/* İkonlar */}
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => toggleFavorite(product.product_id)}
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                aria-label="Favorilere ekle"
                                            >
                                                <svg
                                                    className={`w-5 h-5 transition-colors duration-200 ${
                                                        favorites.has(product.product_id) ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
                                                    }`}
                                                    fill={favorites.has(product.product_id) ? 'currentColor' : 'none'}
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>

                                            <button
                                                onClick={() => addProductToBasket(product.product_id)}
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                                aria-label="Sepete ekle"
                                            >
                                                <svg className="w-5 h-5 text-gray-600 hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RecommendedProductsSlider;
