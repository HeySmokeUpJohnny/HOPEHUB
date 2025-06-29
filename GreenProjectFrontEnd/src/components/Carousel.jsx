import React, { useState, useEffect, useRef } from 'react';

const PopularProductsSlider = () => {
    const [products, setProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const sliderRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const sampleProducts = [
            {
                id: 1,
                name: "Premium Kulaklık",
                description: "Yüksek kaliteli kablosuz kulaklık",
                price: 299.99,
                imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                discount: 0.15,
                rating: 5
            },
            {
                id: 2,
                name: "Akıllı Saat",
                description: "Sağlık takibi yapan en son akıllı saat",
                price: 199.99,
                imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
                discount: 0.10,
                rating: 4
            },
            {
                id: 3,
                name: "Kablosuz Kulaklık",
                description: "Gürültü önleyici kablosuz kulaklık",
                price: 149.99,
                imageUrl: "https://images.unsplash.com/photo-1505742636500-af87a8b7fd1d?w=500",
                discount: 0.20,
                rating: 5
            },
            {
                id: 4,
                name: "Fitness Takip Cihazı",
                description: "Gelişmiş fitness takip cihazı",
                price: 89.99,
                imageUrl: "https://images.unsplash.com/photo-1575311373937-040d8a42b5f9?w=500",
                discount: 0.05,
                rating: 4
            },
            {
                id: 5,
                name: "Bluetooth Hoparlör",
                description: "Taşınabilir su geçirmez hoparlör",
                price: 79.99,
                imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
                discount: 0.25,
                rating: 5
            }
        ];
        setProducts(sampleProducts);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex >= products.length - slidesToShow ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - slidesToShow : prevIndex - 1
        );
    };

    const slideWidth = 100 / slidesToShow;

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-8">Popüler Ürünler</h2>

            <div className="relative">
                <div className="flex overflow-hidden">
                    <div
                        ref={sliderRef}
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * slideWidth}%)`,
                            width: `${products.length * 100}%`
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="p-4"
                                style={{ width: `${slideWidth}%` }}
                            >
                                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                                    <div className="relative h-56 sm:h-64">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {product.discount > 0 && (
                                            <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                                %{product.discount * 100} İndirim
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5 flex-grow flex flex-col">
                                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <span className="text-gray-500 line-through text-sm">
                                                    {product.price.toFixed(2)} TL
                                                </span>
                                                <span className="text-red-500 font-bold ml-2">
                                                    {(product.price * (1 - product.discount)).toFixed(2)} TL
                                                </span>
                                            </div>
                                            <div className="text-yellow-400">
                                                {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                                            </div>
                                        </div>
                                        <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded transition-colors">
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-all z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90 rounded-full p-2 shadow-md transition-all z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="flex justify-center mt-4">
                {products.slice(0, products.length - slidesToShow + 1).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 mx-1 rounded-full ${
                            currentIndex === index ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default PopularProductsSlider;