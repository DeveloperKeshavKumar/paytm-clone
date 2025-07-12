import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../service/api";
import { ArrowRight, User, Mail, Lock } from "lucide-react";

export const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
        setIsVisible(true); // Trigger animations
    }, [navigate]);

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            const response = await signUp({ name, email, password });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-purple-100 py-16 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    {/* Animated heading */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} text-center mb-12`}>
                        <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
                            Join{" "}
                            <span className="text-transparent font-medium bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                                GorillaPay
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Create your account to get started
                        </p>
                    </div>

                    {/* Animated form */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 p-8">
                            <div className="space-y-6">
                                <div className="group">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                        <User className="h-5 w-5 text-gray-400 ml-4 transition-colors duration-200 group-focus-within:text-blue-500" />
                                        <input
                                            placeholder="Keshav Kumar"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full py-3 px-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                        <Mail className="h-5 w-5 text-gray-400 ml-4 transition-colors duration-200 group-focus-within:text-blue-500" />
                                        <input
                                            placeholder="keshav@gmail.com"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full py-3 px-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-all duration-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                                        <Lock className="h-5 w-5 text-gray-400 ml-4 transition-colors duration-200 group-focus-within:text-blue-500" />
                                        <input
                                            placeholder="••••••••"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full py-3 px-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-400"
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Use 8 or more characters with a mix of letters, numbers & symbols
                                    </p>
                                </div>

                                <Button
                                    label={isLoading ? "Creating account..." : "Sign up"}
                                    onClick={handleSignup}
                                    disabled={isLoading}
                                    icon={!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                                    className={`w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:transform hover:scale-[1.02]'}`}
                                />
                            </div>

                            <BottomWarning 
                                label={"Already have an account?"} 
                                buttonText={"Sign in"} 
                                to={"/signin"} 
                            />
                        </div>
                    </div>
                </div>

                {/* Floating elements for visual interest */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-4 h-4 bg-blue-200 rounded-full animate-bounce animation-delay-1000 opacity-20"></div>
                    <div className="absolute top-32 right-16 w-6 h-6 bg-purple-200 rounded-full animate-bounce animation-delay-2000 opacity-20"></div>
                    <div className="absolute bottom-20 left-20 w-3 h-3 bg-green-200 rounded-full animate-bounce animation-delay-3000 opacity-20"></div>
                    <div className="absolute bottom-32 right-10 w-5 h-5 bg-pink-200 rounded-full animate-bounce animation-delay-4000 opacity-20"></div>
                </div>
            </div>
        </section>
    );
};