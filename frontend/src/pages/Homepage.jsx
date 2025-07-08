import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Homepage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) navigate('/dashboard');
    }, [navigate]);

    return (
        <div className="min-h-screen bg-slate-300">
            {/* Navigation */}
            <nav className="bg-slate-300 border-b border-gray-200 py-4 px-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-black">Paytm Clone</div>
                <div className="flex gap-4">
                    <Link to="/signin" className="px-4 py-2 text-black hover:bg-slate-300 rounded-md transition-colors">
                        Sign In
                    </Link>
                    <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-md hover:bg-black  transition-colors">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Digital Payments Made Simple
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Send money instantly, pay bills, and recharge with India's most trusted payment app.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/signup" className="px-6 py-3 bg-black text-white rounded-md hover:bg-black  transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="bg-slate-300 rounded-lg p-8 shadow-inner">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="flex justify-between mb-4">
                                <div className="text-gray-500">Balance</div>
                                <div className="font-bold">₹12,345</div>
                            </div>
                            <div className="space-y-3">
                                {['Send Money', 'Mobile Recharge', 'Pay Bills'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                                        <div className="w-8 h-8 bg-gray-300  rounded-full flex items-center justify-center">
                                            {i === 0 ? '→' : i === 1 ? '📱' : '💡'}
                                        </div>
                                        <div>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="bg-slate-300 py-12  border-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: '⚡', title: 'Instant Transfers', desc: 'UPI transfers in seconds' },
                            { icon: '🔒', title: 'Secure', desc: 'Bank-level encryption' },
                            { icon: '💳', title: 'Multi-Bank', desc: 'Link all your bank accounts' },
                        ].map((feature, i) => (
                            <div key={i} className="bg-gray-100 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};