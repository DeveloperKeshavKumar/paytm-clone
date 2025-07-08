import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBalance } from "../service/api";
import { TransferFunds } from '../components/TransferFunds';
import { TransactionHistory } from '../components/TransactionHistory';

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('history');
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            navigate("/signin");
            return;
        }

        setToken(storedToken);

        // Extract user ID from token (assuming JWT format)
        try {
            const tokenPayload = JSON.parse(atob(storedToken.split('.')[1]));
            setUserId(tokenPayload.userId || tokenPayload.id || tokenPayload.sub || 'USER_ID_NOT_FOUND');
        } catch (error) {
            console.error("Failed to extract user ID from token:", error);
            setUserId('USER_ID_NOT_AVAILABLE');
        }

        fetchBalance(storedToken);
    }, [navigate]);

    const fetchBalance = async (authToken) => {
        try {
            const response = await getBalance(authToken);
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Failed to fetch balance:", error);

            // Handle authentication errors
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTransferSuccess = (newBalance) => {
        // Update balance in header
        setBalance(newBalance);

        // Switch to history tab to show updated transactions
        setActiveTab('history');

        // Optionally show a success message
        console.log('Transfer completed successfully!');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/signin');
    };

    const handleCopyUserId = async () => {
        try {
            await navigator.clipboard.writeText(userId);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (error) {
            console.error("Failed to copy user ID:", error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = userId;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">Payments Dashboard</div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Balance Display */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Current Balance</h2>
                        <div className="text-4xl font-bold text-green-600">₹{balance.toLocaleString('en-IN')}</div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        className={`py-3 px-6 font-medium text-sm transition-colors ${activeTab === 'history'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('history')}
                    >
                        Transaction History
                    </button>
                    <button
                        className={`py-3 px-6 font-medium text-sm transition-colors ${activeTab === 'transfer'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('transfer')}
                    >
                        Transfer Funds
                    </button>
                    <button
                        className={`py-3 px-6 font-medium text-sm transition-colors ${activeTab === 'receive'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('receive')}
                    >
                        Receive Funds
                    </button>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {activeTab === 'history' && (
                        <TransactionHistory token={token} />
                    )}
                    {activeTab === 'transfer' && (
                        <TransferFunds
                            token={token}
                            onSuccess={handleTransferSuccess}
                        />
                    )}
                    {activeTab === 'receive' && (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Receive Funds</h3>
                            <p className="text-gray-600 mb-6">
                                Share your User ID with others to receive payments
                            </p>

                            <div className="max-w-md mx-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm">
                                        {userId}
                                    </div>
                                    <button
                                        onClick={handleCopyUserId}
                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${copySuccess
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                    >
                                        {copySuccess ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {copySuccess && (
                                    <p className="text-xs text-green-600">User ID copied to clipboard!</p>
                                )}
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 rounded-md">
                                <p className="text-sm text-blue-700">
                                    <strong>How to receive money:</strong><br />
                                    1. Share your User ID with the sender<br />
                                    2. Ask them to use the "Transfer Funds" feature<br />
                                    3. They'll enter your User ID and the amount<br />
                                    4. Money will be added to your balance automatically
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};