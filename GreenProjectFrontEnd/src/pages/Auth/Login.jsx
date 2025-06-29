import React, {useState} from 'react';
import {authLogin} from '../../services/AuthService.js';
import {useNavigate} from "react-router-dom";
import {useAuth} from '../../context/AuthContext.jsx'
import {routes} from '../../routes/Routes.js'

const Login = () => {
    const [username, setUsername] = useState('lealcndmr');
    const [password, setPassword] = useState('123');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {login} = useAuth();

    const navigate = useNavigate();

    const handleLogin = async () => {
        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await authLogin({ username, password });
            const customerInfo = {
                "accessToken": response.data.accessToken,
                "username": response.data.userName,
                "customerId": response.data.customerId
            }
            login(customerInfo);
            navigate(`${routes.HomePage}`);
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) {
                setErrorMessage("Kullanıcı adı veya şifre yanlış.");
            } else if (status === 403) {
                setErrorMessage("Erişim izniniz yok.");
            } else {
                setErrorMessage("Beklenmeyen bir hata oluştu.");
            }
        } finally {
            setIsLoading(false);
        }
    };
    const handleLogoClick = () => {
        navigate(`${routes.HomePage}`);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="w-full max-w-sm">
                {/* GreenProject Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={handleLogoClick}
                        className="inline-flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
                    >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8z"/>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-green-600">GreenProject</span>
                    </button>
                </div>
                {/* Login Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-1">Giriş Yap</h1>
                        <p className="text-gray-600 text-sm">Hesabınıza erişin</p>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-red-700 text-sm font-medium">{errorMessage}</span>
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Username Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
                            <input
                                type="text"
                                value={username}
                                placeholder="Kullanıcı adınızı girin"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="Şifrenizi girin"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 pr-10"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 px-6 rounded-xl font-medium hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                        >
                            <div className="flex items-center justify-center">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Giriş Yapılıyor...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Giriş Yap
                                    </>
                                )}
                            </div>
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Hesabınız yok mu?{' '}
                            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline">
                                Kayıt Ol
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 text-center">
                    <p className="text-gray-500 text-xs">
                        Güvenli giriş için SSL şifreleme kullanılmaktadır
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;