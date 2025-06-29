import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {routes} from "../routes/Routes.js"
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState(3);
    const [notifications, setNotifications] = useState(2);
    const { isAuthenticated ,logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors duration-200">HOPE-HUB</span>
                        </Link>
                    </div>

                    {/* Arama Çubuğu - Ortada - Sadece desktop'ta görünür */}
                    <div className="hidden md:flex md:items-center md:justify-center md:flex-1">
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="Ürün ara..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
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
                        {/* Sepet */}
                        <div className="relative">
                            <Link to={routes.Basket} className="p-2 rounded-full text-gray-500 hover:text-green-600 focus:outline-none transition-colors duration-200">
                                <div className="relative items-center justify-center flex">
                                    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        {/* Giriş Yap / Profil - Sadece desktop'ta görünür */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 focus:outline-none transition-all duration-200 transform hover:scale-105"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </button>

                                    {/* Profil Dropdown - Yeşil Tema */}
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-200 ease-out">
                                            {/* Header */}
                                            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">Hoş geldiniz</p>
                                                        <p className="text-green-100 text-sm">Hesabınızı yönetin</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    to="/profile"
                                                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                                                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Profilim</span>
                                                </Link>

                                                <Link
                                                    to="/orders"
                                                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                                                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Siparişlerim</span>
                                                </Link>
                                                <Link
                                                    to={routes.Donation}
                                                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                                                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Bağış Puanları</span>
                                                </Link>

                                                <Link
                                                    to="/settings"
                                                    className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 group"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                                                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Ayarlar</span>
                                                </Link>
                                            </div>

                                            {/* Divider */}
                                            <div className="border-t border-gray-100 mx-6"></div>

                                            {/* Logout */}
                                            <div className="py-2">
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                                                >
                                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-red-200 transition-colors duration-200">
                                                        <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Çıkış Yap</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to={routes.Login}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                                    >
                                        Giriş Yap
                                    </Link>
                                    <Link
                                        to={routes.Register}
                                        className="px-4 py-2 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                                    >
                                        Kayıt ol
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobil Menü Butonu - Sadece mobil'de görünür */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-full text-gray-500 hover:text-green-600 hover:bg-green-50 focus:outline-none transition-colors duration-200"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobil Menü - Sadece mobil'de görünür */}
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                        {/* Mobil Arama */}
                        <div className="px-3 py-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Ürün ara..."
                                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                                <div className="absolute left-3 top-2.5">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Mobil Menü Linkleri */}
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-green-600 hover:bg-green-50 transition-colors duration-200">
                            Ana Sayfa
                        </Link>
                        <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200">
                            Ürünler
                        </Link>
                        <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200">
                            Kategoriler
                        </Link>
                        <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200">
                            Hakkımızda
                        </Link>

                        {/* Mobil Giriş/Kayıt Butonları */}
                        {!isAuthenticated && (
                            <div className="px-3 py-2 space-y-2">
                                <Link
                                    to={routes.Login}
                                    className="block w-full text-center px-4 py-2 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    to={routes.Register}
                                    className="block w-full text-center px-4 py-2 rounded-full text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                                >
                                    Kayıt ol
                                </Link>
                            </div>
                        )}

                        {/* Mobil Profil Menüsü */}
                        {isAuthenticated && (
                            <div className="px-3 py-2 space-y-1">
                                <Link
                                    to="/profile"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                                >
                                    Profilim
                                </Link>
                                <Link
                                    to="/orders"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                                >
                                    Siparişlerim
                                </Link>
                                <Link
                                    to="/settings"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                                >
                                    Ayarlar
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;