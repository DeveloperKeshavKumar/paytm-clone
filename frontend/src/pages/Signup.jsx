import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signUp } from "../service/api"

export const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSignup = async () => {
        try {
            const response = await signUp({ name, email, password });

            // Save the token in localStorage
            localStorage.setItem("token", response.data.token);

            // Redirect to dashboard or another page after successful signup
            navigate("/dashboard");
        } catch (error) {
            // Handle errors (display to user)
            alert(error.response?.data?.message || "Signup failed");
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <Inputbox
                    placeholder="Keshav Kumar"
                    label={"Full Name"}
                    setValue={setName}
                    value={name}
                />
                <Inputbox
                    placeholder="keshav@gmail.com"
                    label={"Email"}
                    type={"email"}
                    setValue={setEmail}
                    value={email}
                />
                <Inputbox
                    placeholder="123456"
                    label={"Password"}
                    type={"password"}
                    setValue={setPassword}
                    value={password}
                />
                <div className="pt-4">
                    <Button
                        label={"Sign up"}
                        onClick={handleSignup}
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
}