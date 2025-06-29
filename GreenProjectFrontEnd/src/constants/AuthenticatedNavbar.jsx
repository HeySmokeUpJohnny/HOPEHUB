import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {routes} from "../routes/Routes.js"

const AuthenticatedNavbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState(3); // Örnek sepet ürün sayısı
    const [notifications, setNotifications] = useState(2); // Örnek bildirim sayısı
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("auth")); // Giriş durumu için state

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">ShopEase</span>
                        </Link>
                    </div>

                    {/* Arama Çubuğu - Ortada */}
                    <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Ürün ara..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                            <div className="absolute left-3 top-2.5">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Menü */}
                    <div className="flex items-center space-x-4">
                        {/* Bildirimler */}
                        <div className="relative">
                            <button className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-200">
                                <div className="relative">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                    {notifications > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-red-500 rounded-full">
                                            {notifications}
                                        </span>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Sepet */}
                        <div className="relative">
                            <Link to={routes.Basket} className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-200">
                                <div className="relative">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {cartItems > 0 && (
                                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform bg-blue-600 rounded-full">
                                            {cartItems}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </div>

                        {/* Giriş Yap / Profil */}
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-200"
                                >
                                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Profil Dropdown */}
                                {isProfileOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            Profilim
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            Siparişlerim
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                        >
                                            Ayarlar
                                        </Link>
                                        <div className="border-t border-gray-100"></div>
                                        <button
                                            onClick={() => setIsLoggedIn(false)}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                                        >
                                            Çıkış Yap
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                            >
                                Giriş Yap
                            </Link>
                        )}

                        {/* Mobil Menü Butonu */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 focus:outline-none transition-colors duration-200"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobil Menü */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                            Ana Sayfa
                        </Link>
                        <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                            Ürünler
                        </Link>
                        <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                            Kategoriler
                        </Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200">
                            Hakkımızda
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default AuthenticatedNavbar;