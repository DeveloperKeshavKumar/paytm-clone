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
    const [animateBalance, setAnimateBalance] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [balanceCount, setBalanceCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
        
        // Animate balance counter
        const interval = setInterval(() => {
            setBalanceCount(prev => {
                if (prev < balance) return prev + Math.max(1, Math.floor(balance / 20));
                clearInterval(interval);
                return balance;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [balance]);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            navigate("/signin");
            return;
        }

        setToken(storedToken);

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
            setAnimateBalance(true);
            setTimeout(() => setAnimateBalance(false), 1000);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/signin');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTransferSuccess = (newBalance) => {
        setBalance(newBalance);
        setActiveTab('history');
        setAnimateBalance(true);
        setTimeout(() => setAnimateBalance(false), 1000);
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
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center">
                <div className="text-center animate-pulse">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 font-light">
            {/* Hero Header */}
            <header className="bg-gradient-to-r from-purple-700 to-blue-400 text-white py-12 px-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-4 h-4 bg-white rounded-full animate-bounce animation-delay-1000"></div>
                    <div className="absolute top-32 right-16 w-6 h-6 bg-white rounded-full animate-bounce animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-20 w-3 h-3 bg-white rounded-full animate-bounce animation-delay-3000"></div>
                    <div className="absolute bottom-32 right-10 w-5 h-5 bg-white rounded-full animate-bounce animation-delay-4000"></div>
                </div>
                
                <div className="max-w-6xl mx-auto relative">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-blue-700 backdrop-blur-md flex items-center justify-center text-white font-bold transition-transform hover:scale-110">
                                <span className="text-xl">G</span>
                            </div>
                            <div className="text-2xl font-semibold text-white">GorillaPay</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 text-sm font-medium text-white bg-red-600 backdrop-blur-md rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            Logout
                        </button>
                    </div>
                    
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 leading-tight">
                            Welcome to Your <span className="font-medium">Digital Wallet</span>
                        </h1>
                        <p className="text-lg text-blue-100 max-w-2xl mb-8">
                            Send, receive, and track your transactions with our secure payment platform.
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8 -mt-16 relative z-10">
                {/* Balance Card with Hero Styling */}
                <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 p-8 mb-8 hover:shadow-2xl transition-all duration-500 ${animateBalance ? 'animate-pulse' : ''}`}>
                    <div className="text-center">
                        <h2 className="text-lg font-medium text-gray-600 mb-1">Your Current Balance</h2>
                        <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-500 ${animateBalance ? 'scale-110' : 'scale-100'}`}>
                            ₹{balanceCount.toLocaleString('en-IN')}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-1 mb-8 transition-all duration-300">
                    {['history', 'transfer', 'receive'].map((tab) => (
                        <button
                            key={tab}
                            className={`flex-1 py-3 px-6 font-medium text-sm transition-all duration-300 rounded-lg hover:scale-105 active:scale-95 ${activeTab === tab
                                ? 'bg-white shadow-md text-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab === 'history' && 'Transaction History'}
                            {tab === 'transfer' && 'Send Money'}
                            {tab === 'receive' && 'Receive Money'}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="relative">
                    <div 
                        className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 ${activeTab === 'history' ? 'block' : 'hidden'}`}
                    >
                        <TransactionHistory token={token} />
                    </div>
                    <div 
                        className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 ${activeTab === 'transfer' ? 'block' : 'hidden'}`}
                    >
                        <TransferFunds
                            token={token}
                            onSuccess={handleTransferSuccess}
                        />
                    </div>
                    <div 
                        className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300 ${activeTab === 'receive' ? 'block' : 'hidden'}`}
                    >
                        <div className="text-center py-4">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Receive Payments</h3>
                            <p className="text-gray-600 mb-8 text-lg">
                                Share your unique GorillaPay ID to receive money instantly
                            </p>

                            <div className="max-w-md mx-auto mb-8 transition-all duration-300 hover:scale-105">
                                <div className="relative">
                                    <div className="p-4 bg-gray-50/80 border border-gray-200 rounded-xl font-mono text-lg truncate shadow-inner">
                                        {userId}
                                    </div>
                                    <button
                                        onClick={handleCopyUserId}
                                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 ${copySuccess
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                            }`}
                                    >
                                        {copySuccess ? (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {copySuccess && (
                                    <p className="text-sm text-green-600 mt-3 animate-fade-in">Copied to clipboard!</p>
                                )}
                            </div>

                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 transition-all duration-300 hover:shadow-inner">
                                <h4 className="text-lg font-medium text-blue-800 mb-4">How to receive money:</h4>
                                <ul className="space-y-3 text-left text-blue-700">
                                    <li className="flex items-start">
                                        <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        Share your GorillaPay ID with the sender
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        They'll enter your ID in the Send Money section
                                    </li>
                                    <li className="flex items-start">
                                        <span className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        Money will appear in your balance instantly
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};