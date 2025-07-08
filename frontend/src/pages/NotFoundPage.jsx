import { useState, useEffect } from 'react';

export const NotFoundPage = () => {
    const [coins, setCoins] = useState([]);
    const [countdown, setCountdown] = useState(5);

    // Generate floating coins animation
    useEffect(() => {
        const generateCoins = () => {
            const coinArray = [];
            for (let i = 0; i < 20; i++) {
                coinArray.push({
                    id: i,
                    left: Math.random() * 100,
                    animationDelay: Math.random() * 3,
                    animationDuration: 3 + Math.random() * 2,
                    size: 20 + Math.random() * 30,
                });
            }
            setCoins(coinArray);
        };
        generateCoins();
    }, []);

    // Auto redirect countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // In a real app, you'd use navigate('/') here
                    window.location.href = '/';
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleGoHome = () => {
        // In a real app, you'd use navigate('/') here
        window.location.href = '/';
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                {/* Floating Coins */}
                {coins.map((coin) => (
                    <div
                        key={coin.id}
                        className="absolute animate-bounce opacity-20"
                        style={{
                            left: `${coin.left}%`,
                            animationDelay: `${coin.animationDelay}s`,
                            animationDuration: `${coin.animationDuration}s`,
                            width: `${coin.size}px`,
                            height: `${coin.size}px`,
                        }}
                    >
                        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center">
                            <span className="text-yellow-900 font-bold text-xs">₹</span>
                        </div>
                    </div>
                ))}

                {/* Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
                {/* 404 Number with Gold Effect */}
                <div className="mb-8">
                    <h1 className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
                        404
                    </h1>
                    <div className="relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Oops! Your Money Trail Went Cold
                    </h2>
                    <p className="text-xl text-gray-300 mb-2">
                        The page you're looking for seems to have vanished into thin air
                    </p>
                    <p className="text-lg text-gray-400">
                        Don't worry, your wallet is still safe with us! 💰
                    </p>
                </div>

                {/* Animated Money Icons */}
                <div className="flex justify-center items-center space-x-6 mb-8">
                    <div className="animate-bounce" style={{ animationDelay: '0s' }}>
                        <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-green-400 rounded-full flex items-center justify-center shadow-xl">
                            <span className="text-2xl">💵</span>
                        </div>
                    </div>
                    <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                        <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center shadow-xl">
                            <span className="text-2xl">🪙</span>
                        </div>
                    </div>
                    <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full flex items-center justify-center shadow-xl">
                            <span className="text-2xl">💰</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button
                        onClick={handleGoHome}
                        className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold rounded-xl shadow-lg hover:from-yellow-600 hover:to-yellow-700 transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-500/25 hover:shadow-2xl"
                    >
                        <span className="relative z-10">🏠 Return to Dashboard</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <button
                        onClick={handleGoBack}
                        className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 border border-gray-600 hover:border-gray-500"
                    >
                        <span className="relative z-10">⬅️ Go Back</span>
                    </button>
                </div>

                {/* Auto Redirect Timer */}
                <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
                        <span>Automatically redirecting to homepage in</span>
                        <span className="text-yellow-400 font-bold text-xl">{countdown}</span>
                        <span>seconds</span>
                    </div>
                </div>

                {/* Fun Facts */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 italic">
                        "Did you know? This 404 page contains more gold than your average treasure chest! ✨"
                    </p>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 text-6xl animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}>
                💎
            </div>
            <div className="absolute bottom-10 left-10 text-5xl animate-bounce opacity-30" style={{ animationDelay: '1s' }}>
                🏆
            </div>
            <div className="absolute top-1/3 right-1/4 text-4xl animate-bounce opacity-30" style={{ animationDelay: '1.5s' }}>
                💳
            </div>
        </div>
    );
};