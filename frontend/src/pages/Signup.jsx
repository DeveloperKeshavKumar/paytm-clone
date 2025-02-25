import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your infromation to create an account"} />
                <Inputbox placeholder="John Doe" label={"Full Name"} />
                <Inputbox placeholder="harkirat@gmail.com" label={"Email"} />
                <Inputbox placeholder="123456" label={"Password"} />
                <div className="pt-4">
                    <Button label={"Sign up"} />
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Signin"} to={"/signin"} />
            </div>
        </div>
    </div>
}