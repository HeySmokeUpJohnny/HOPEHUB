import React, { useState, useEffect } from 'react';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Mock data - replace with actual API call
    useEffect(() => {
        const mockOrders = [
            {
                id: 'ORD-2024-001',
                customerName: 'Ahmet Yılmaz',
                product: 'Yeşil Teknoloji Paketi',
                amount: 1250.00,
                status: 'completed',
                date: '2024-01-15',
                paymentMethod: 'Kredi Kartı',
                items: 3
            },
            {
                id: 'ORD-2024-002',
                customerName: 'Fatma Demir',
                product: 'Sürdürülebilir Enerji Çözümü',
                amount: 890.50,
                status: 'processing',
                date: '2024-01-14',
                paymentMethod: 'Banka Transferi',
                items: 2
            },
            {
                id: 'ORD-2024-003',
                customerName: 'Mehmet Kaya',
                product: 'Çevre Dostu Ürün Seti',
                amount: 2100.00,
                status: 'shipped',
                date: '2024-01-13',
                paymentMethod: 'Kredi Kartı',
                items: 5
            },
            {
                id: 'ORD-2024-004',
                customerName: 'Ayşe Özkan',
                product: 'Yeşil Teknoloji Paketi',
                amount: 750.00,
                status: 'pending',
                date: '2024-01-12',
                paymentMethod: 'Nakit',
                items: 1
            },
            {
                id: 'ORD-2024-005',
                customerName: 'Ali Çelik',
                product: 'Sürdürülebilir Enerji Çözümü',
                amount: 1650.00,
                status: 'completed',
                date: '2024-01-11',
                paymentMethod: 'Kredi Kartı',
                items: 4
            },
            {
                id: 'ORD-2024-006',
                customerName: 'Zeynep Arslan',
                product: 'Çevre Dostu Ürün Seti',
                amount: 950.00,
                status: 'completed',
                date: '2024-01-10',
                paymentMethod: 'Kredi Kartı',
                items: 2
            },
            {
                id: 'ORD-2024-007',
                customerName: 'Mustafa Özkan',
                product: 'Yeşil Teknoloji Paketi',
                amount: 1800.00,
                status: 'shipped',
                date: '2024-01-09',
                paymentMethod: 'Banka Transferi',
                items: 3
            },
            {
                id: 'ORD-2024-008',
                customerName: 'Elif Yıldız',
                product: 'Sürdürülebilir Enerji Çözümü',
                amount: 2200.00,
                status: 'processing',
                date: '2024-01-08',
                paymentMethod: 'Kredi Kartı',
                items: 4
            },
            {
                id: 'ORD-2024-009',
                customerName: 'Burak Demir',
                product: 'Çevre Dostu Ürün Seti',
                amount: 1200.00,
                status: 'pending',
                date: '2024-01-07',
                paymentMethod: 'Nakit',
                items: 2
            },
            {
                id: 'ORD-2024-010',
                customerName: 'Selin Kaya',
                product: 'Yeşil Teknoloji Paketi',
                amount: 1600.00,
                status: 'completed',
                date: '2024-01-06',
                paymentMethod: 'Kredi Kartı',
                items: 3
            },
            {
                id: 'ORD-2024-011',
                customerName: 'Emre Çelik',
                product: 'Sürdürülebilir Enerji Çözümü',
                amount: 1950.00,
                status: 'shipped',
                date: '2024-01-05',
                paymentMethod: 'Banka Transferi',
                items: 5
            },
            {
                id: 'ORD-2024-012',
                customerName: 'Deniz Arslan',
                product: 'Çevre Dostu Ürün Seti',
                amount: 850.00,
                status: 'completed',
                date: '2024-01-04',
                paymentMethod: 'Kredi Kartı',
                items: 1
            }
        ];

        setTimeout(() => {
            setOrders(mockOrders);
            setFilteredOrders(mockOrders);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Search and filter functionality
    useEffect(() => {
        let filtered = orders;

        // Search by order ID
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order.id.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(order => order.status === selectedStatus);
        }

        // Sort orders
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'date':
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
                    break;
                case 'amount':
                    aValue = a.amount;
                    bValue = b.amount;
                    break;
                case 'id':
                    aValue = a.id;
                    bValue = b.id;
                    break;
                default:
                    aValue = a[sortBy];
                    bValue = b[sortBy];
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredOrders(filtered);
        setCurrentPage(1); // Reset to first page when filtering
    }, [orders, searchTerm, selectedStatus, sortBy, sortOrder]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, endIndex);

    // Pagination functions
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'Tamamlandı';
            case 'processing':
                return 'İşleniyor';
            case 'shipped':
                return 'Kargoda';
            case 'pending':
                return 'Beklemede';
            default:
                return status;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY'
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Siparişler yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Siparişlerim</h1>
                            <p className="text-gray-600">Tüm siparişlerinizi görüntüleyin ve yönetin</p>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Sipariş ID ile ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                            >
                                <option value="all">Tüm Durumlar</option>
                                <option value="pending">Beklemede</option>
                                <option value="processing">İşleniyor</option>
                                <option value="shipped">Kargoda</option>
                                <option value="completed">Tamamlandı</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                            >
                                <option value="date">Tarihe Göre</option>
                                <option value="amount">Tutara Göre</option>
                                <option value="id">Sipariş ID'ye Göre</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                            >
                                <option value="desc">Azalan</option>
                                <option value="asc">Artan</option>
                            </select>
                        </div>

                        {/* Items Per Page */}
                        <div>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200"
                            >
                                <option value={5}>5 / Sayfa</option>
                                <option value={10}>10 / Sayfa</option>
                                <option value={20}>20 / Sayfa</option>
                                <option value={50}>50 / Sayfa</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                            <span className="font-semibold text-gray-900">{filteredOrders.length}</span> sipariş bulundu
                            {filteredOrders.length > 0 && (
                                <span className="ml-2">
                                    (Sayfa {currentPage} / {totalPages})
                                </span>
                            )}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200"
                            >
                                Aramayı Temizle
                            </button>
                        )}
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sipariş ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Müşteri
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ürün
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tutar
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Durum
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tarih
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    İşlemler
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {currentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900">{order.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                        <div className="text-sm text-gray-500">{order.items} ürün</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">{order.product}</div>
                                        <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-semibold text-gray-900">{formatCurrency(order.amount)}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusText(order.status)}
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(order.date)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-900 transition-colors duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button className="text-red-600 hover:text-red-900 transition-colors duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {filteredOrders.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Sipariş bulunamadı</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {searchTerm ? 'Arama kriterlerinize uygun sipariş bulunamadı.' : 'Henüz siparişiniz bulunmuyor.'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {filteredOrders.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 border border-gray-100">
                        <div className="flex items-center justify-between">
                            {/* Page Info */}
                            <div className="text-sm text-gray-700">
                                <span className="font-medium">
                                    {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)}
                                </span>
                                {' '}arası, toplam{' '}
                                <span className="font-medium">{filteredOrders.length}</span>
                                {' '}sipariş
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex items-center space-x-2">
                                {/* Previous Button */}
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Önceki
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center space-x-1">
                                    {/* First Page */}
                                    {currentPage > 3 && (
                                        <>
                                            <button
                                                onClick={() => goToPage(1)}
                                                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                1
                                            </button>
                                            {currentPage > 4 && (
                                                <span className="px-2 text-gray-500">...</span>
                                            )}
                                        </>
                                    )}

                                    {/* Page Numbers */}
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => goToPage(pageNum)}
                                                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                    currentPage === pageNum
                                                        ? 'bg-green-600 text-white border border-green-600'
                                                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    {/* Last Page */}
                                    {currentPage < totalPages - 2 && (
                                        <>
                                            {currentPage < totalPages - 3 && (
                                                <span className="px-2 text-gray-500">...</span>
                                            )}
                                            <button
                                                onClick={() => goToPage(totalPages)}
                                                className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Sonraki
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderList;