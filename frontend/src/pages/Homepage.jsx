import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, Wallet, Users, Shield, ArrowRight, User, Mail, Lock } from 'lucide-react';

export const Homepage = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/dashboard');
        setIsVisible(true); // Trigger animations
    }, [navigate]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-purple-700 via-white to-blue-400 text-gray-800 overflow-hidden font-light">
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Fixed SVG background pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgNDBoNDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-20"></div>

                {/* Floating currency symbols */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-xl text-purple-200 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${15 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >
                        {['₹', '$', '€', '£', '¥'][i % 5]}
                    </div>
                ))}
            </div>

            <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-blue-100 via-white to-purple-200 border border-white/20 backdrop-blur-xl">
                    <div className="px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link
                                to="/"
                                className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
                            >
                                GorillaPay
                            </Link>

                            <div className="hidden lg:flex items-center space-x-4">
                                <Link to="/signin">
                                    <button className="text-sm font-medium px-4 py-2 text-gray-700 hover:text-blue-600 rounded-full hover:bg-white/10 transition-all duration-300">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button className="text-sm font-medium px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-1">
                                        Sign Up <ArrowRight className="h-4 w-4" />
                                    </button>
                                </Link>
                            </div>

                            <button
                                className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle menu"
                            >
                                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {menuOpen && (
                    <div className="lg:hidden bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden mt-2">
                        <div className="px-6 py-4 space-y-2">
                            <div className="pt-2 mt-2 border-t border-white/20 space-y-2">
                                <Link
                                    to="/signin"
                                    className="block px-4 py-3 rounded-xl font-medium text-sm text-gray-700 hover:bg-white/10 hover:text-blue-600 transition-all duration-300"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="block px-4 py-3 text-center font-medium text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            <main className="relative z-10 mt-16 pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
                <section className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-center max-w-3xl mx-auto mb-24`}>
                    <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                        Simple. Fast.{" "}
                        <span className="text-transparent font-medium bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                            Free.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Get started with a random balance and start trading instantly with friends.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup">
                            <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                Get Started <ArrowRight className="h-4 w-4" />
                            </button>
                        </Link>
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-5xl font-light text-center mb-12 ">
                        How it works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: <Wallet className="h-6 w-6 text-purple-600" />,
                                title: "Instant Balance",
                                description: "Get ₹1000–₹5000 to start trading immediately after signup."
                            },
                            {
                                icon: <Users className="h-6 w-6 text-blue-600" />,
                                title: "Friend Network",
                                description: "Connect with friends and trade with zero fees."
                            },
                            {
                                icon: <Shield className="h-6 w-6 text-pink-600" />,
                                title: "Secure Platform",
                                description: "Built with modern tech and a clean design."
                            }
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 pb-2 sm:p-10 text-center border border-white/20 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Ready to get started?</h2>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Join 500+ users enjoying seamless transactions with GorillaPay.
                    </p>
                    <Link to="/signup">
                        <button className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
                            Create your account <ArrowRight className="h-4 w-4" />
                        </button>
                    </Link>
                </section>
            </main>

            <footer className="relative z-10 border-t border-white/30 bg-white/50 backdrop-blur-lg py-8 pt-0 mt-20">
                <div className="container mx-auto px-4 sm:px-6 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} GorillaPay. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};