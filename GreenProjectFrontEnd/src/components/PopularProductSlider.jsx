import React, { useState } from 'react';

const PopulerProductSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState(new Set());

    // Ürün verileri component içinde
    const products = [
        {
            productId: 1,
            productName: "Organik Pamuklu T-Shirt",
            productDescription: "Doğal pamuktan üretilmiş, nefes alabilir ve rahat t-shirt. Çevre dostu üretim süreci ile %100 organik pamuk kullanılarak üretilmiştir.",
            productPrice: 89.99,
            productQuantity: 50,
            isNew: true,
            hasDiscount: true,
            discountPercentage: 25
        },
        {
            productId: 2,
            productName: "Eko Dostu Su Matarası",
            productDescription: "Çevre dostu, BPA içermeyen paslanmaz çelik su matarası. 500ml kapasiteli, ısı yalıtımlı tasarım.",
            productPrice: 149.99,
            productQuantity: 30,
            isNew: false,
            hasDiscount: true,
            discountPercentage: 15
        },
        {
            productId: 3,
            productName: "Bambu Diş Fırçası Seti",
            productDescription: "Doğada çözünebilir bambu diş fırçası, 4'lü set. Plastik içermeyen, çevre dostu diş bakım ürünü.",
            productPrice: 39.99,
            productQuantity: 100,
            isNew: true,
            hasDiscount: false,
            discountPercentage: 0
        },
        {
            productId: 4,
            productName: "Güneş Enerjili Şarj Cihazı",
            productDescription: "Yenilenebilir enerji ile çalışan taşınabilir şarj cihazı. 10000mAh kapasiteli, USB-C ve USB-A çıkışları.",
            productPrice: 299.99,
            productQuantity: 25,
            isNew: false,
            hasDiscount: true,
            discountPercentage: 30
        },
        {
            productId: 5,
            productName: "Organik Sabun Seti",
            productDescription: "Doğal malzemelerden üretilmiş 6'lı sabun seti. Zeytinyağı ve lavanta özlü, cilt dostu formül.",
            productPrice: 69.99,
            productQuantity: 75,
            isNew: false,
            hasDiscount: true,
            discountPercentage: 20
        },
        {
            productId: 6,
            productName: "Geri Dönüştürülmüş Kağıt Defter",
            productDescription: "Çevre dostu, geri dönüştürülmüş kağıttan üretilmiş defter. 80 sayfa, A5 boyut, spiral ciltli.",
            productPrice: 24.99,
            productQuantity: 200,
            isNew: true,
            hasDiscount: false,
            discountPercentage: 0
        },
        {
            productId: 7,
            productName: "LED Enerji Tasarruflu Ampul",
            productDescription: "Enerji tasarruflu LED ampul, 9W güç tüketimi ile 60W eşdeğer ışık verimi. 6500K soğuk beyaz.",
            productPrice: 45.99,
            productQuantity: 150,
            isNew: false,
            hasDiscount: true,
            discountPercentage: 35
        },
        {
            productId: 8,
            productName: "Organik Pamuklu Havlu Seti",
            productDescription: "Doğal pamuktan üretilmiş 4'lü havlu seti. Yumuşak dokulu, hızlı kuruyan, antibakteriyel.",
            productPrice: 129.99,
            productQuantity: 40,
            isNew: true,
            hasDiscount: true,
            discountPercentage: 10
        },
        {
            productId: 9,
            productName: "Güneş Paneli Şarj Cihazı",
            productDescription: "Güneş enerjisi ile şarj olan taşınabilir cihaz. 20000mAh kapasiteli, çevre dostu enerji.",
            productPrice: 399.99,
            productQuantity: 15,
            isNew: true,
            hasDiscount: true,
            discountPercentage: 40
        },
        {
            productId: 10,
            productName: "Bambu Bardak Seti",
            productDescription: "Doğal bambudan üretilmiş 6'lı bardak seti. Isı yalıtımlı, çevre dostu tasarım.",
            productPrice: 79.99,
            productQuantity: 60,
            isNew: false,
            hasDiscount: false,
            discountPercentage: 0
        }
    ];

    const productsPerPage = 5; // Her sayfada 5 ürün göster
    const totalPages = Math.ceil(products.length / productsPerPage);

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
    const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Popüler Ürünler</h2>
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
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                            aria-label="Sonraki"
                        >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Card'ları ortalamak için container - Tailwind ile scrollbar gizli */}
            <div className="flex justify-center">
                <div className="flex space-x-6 overflow-x-auto max-w-7xl scrollbar-none">
                    {visibleProducts.map((product) => (
                        <ProductCard
                            key={product.productId}
                            product={product}
                            isFavorite={favorites.has(product.productId)}
                            onToggleFavorite={() => toggleFavorite(product.productId)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {
    const originalPrice = product.productPrice;
    const discountedPrice = product.hasDiscount
        ? originalPrice * (1 - product.discountPercentage / 100)
        : originalPrice;

    return (
        <div className="relative w-80 h-96 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex-shrink-0">
            {/* Yeni Ürün Etiketi - Card'ın sağ üst köşesinde */}
            {product.isNew && (
                <div className="absolute top-3 right-3 z-10">
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
            YENİ
          </span>
                </div>
            )}

            {/* Ürün Görseli - Sabit yükseklik */}
            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <div className="text-center">
                        <svg className="w-12 h-12 mx-auto text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-500 text-sm">Ürün Görseli</span>
                    </div>
                </div>

                {/* İndirim Etiketi */}
                {product.hasDiscount && (
                    <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
              %{product.discountPercentage} İNDİRİM
            </span>
                    </div>
                )}
            </div>

            {/* Ürün Bilgileri - Sabit yükseklik */}
            <div className="p-4 h-48 flex flex-col">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-shrink-0">
                    {product.productName}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                    {product.productDescription}
                </p>

                {/* Fiyat ve İkonlar - Alt kısımda sabit */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-2">
                        {product.hasDiscount ? (
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

                    {/* SVG İkonlar - Fiyatın yanında */}
                    <div className="flex items-center space-x-2">
                        {/* Kalp İkonu */}
                        <button
                            onClick={onToggleFavorite}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            aria-label="Favorilere ekle"
                        >
                            <svg
                                className={`w-5 h-5 transition-colors duration-200 ${
                                    isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 hover:text-red-500'
                                }`}
                                fill={isFavorite ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>

                        {/* Sepet İkonu */}
                        <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            aria-label="Sepete ekle"
                        >
                            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart">
                                <circle cx="9" cy="21" r="1"/>
                                <circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopulerProductSlider;