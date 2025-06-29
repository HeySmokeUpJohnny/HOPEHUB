import React from 'react';

const BrandCloud = () => {
    const brands = [
        { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/LG_symbol.svg/1200px-LG_symbol.svg.png', size: 'h-16' },
        { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png', size: 'h-20' },
        { name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1200px-Samsung_Logo.svg.png', size: 'h-24' },
        { name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png', size: 'h-16' },
    ];

    return (
        <div className="w-full bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-center mb-12 text-gray-800">Güvenilir Markalar</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className="transform hover:scale-110 transition-transform duration-300"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className={`${brand.size} w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandCloud;