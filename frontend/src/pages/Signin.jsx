import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signIn } from "../service/api";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleSignin = async () => {
        try {
            const response = await signIn({ email, password });

            // Save the token in localStorage
            localStorage.setItem("token", response.data.token);

            // Redirect to dashboard after successful signin
            navigate("/dashboard");
        } catch (error) {
            // Handle errors (display to user)
            alert(error.response?.data?.message || "Signin failed. Please check your credentials.");
        }
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <Inputbox
                    placeholder="harkirat@gmail.com"
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
                        label={"Sign in"}
                        onClick={handleSignin}
                    />
                </div>
                <BottomWarning
                    label={"Don't have an account?"}
                    buttonText={"Signup"}
                    to={"/signup"}
                />
            </div>
        </div>
    </div>
}