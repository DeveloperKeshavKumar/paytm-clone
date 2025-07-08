import { useState, useEffect } from 'react';
import { getTransactionHistory } from '../service/api';

export const TransactionHistory = ({ token }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPreviousPage: false
    });
    const [filters, setFilters] = useState({
        type: 'all',
        page: 1,
        limit: 10
    });

    useEffect(() => {
        fetchTransactions();
    }, [filters, token]);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await getTransactionHistory(token, {
                type: filters.type,
                page: filters.page.toString(),
                limit: filters.limit.toString()
            });

            if (response.data) {
                setTransactions(response.data.transactions);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            setError('Failed to load transaction history. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (newType) => {
        setFilters(prev => ({
            ...prev,
            type: newType,
            page: 1 // Reset to first page when filter changes
        }));
    };

    const handlePageChange = (newPage) => {
        setFilters(prev => ({
            ...prev,
            page: newPage
        }));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTransactionIcon = (type) => {
        return type === 'sent' ? '↗️' : '↙️';
    };

    const getAmountClass = (type) => {
        return type === 'sent' ? 'text-red-600' : 'text-green-600';
    };

    const getAmountPrefix = (type) => {
        return type === 'sent' ? '-' : '+';
    };

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>

                {/* Filter Buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => handleFilterChange('all')}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${filters.type === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilterChange('sent')}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${filters.type === 'sent'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Sent
                    </button>
                    <button
                        onClick={() => handleFilterChange('received')}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${filters.type === 'received'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        Received
                    </button>
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {transactions.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">No transactions found.</p>
                </div>
            ) : (
                <>
                    {/* Transactions List */}
                    <div className="space-y-3">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                {transaction.type === 'sent' ? 'Sent to' : 'Received from'} {
                                                    transaction.type === 'sent'
                                                        ? transaction.receiver.name
                                                        : transaction.sender.name
                                                }
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {transaction.type === 'sent'
                                                    ? transaction.receiver.email
                                                    : transaction.sender.email
                                                }
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {formatDate(transaction.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-semibold ${getAmountClass(transaction.type)}`}>
                                            {getAmountPrefix(transaction.type)}₹{transaction.amount.toLocaleString('en-IN')}
                                        </div>
                                        <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${transaction.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : transaction.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {transaction.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-600">
                                Showing {((pagination.currentPage - 1) * filters.limit) + 1} to {Math.min(pagination.currentPage * filters.limit, pagination.totalCount)} of {pagination.totalCount} transactions
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={!pagination.hasPreviousPage}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm text-gray-600">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={!pagination.hasNextPage}
                                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};