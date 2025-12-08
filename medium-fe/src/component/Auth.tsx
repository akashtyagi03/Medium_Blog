import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "./Loader";
import toast from "react-hot-toast";

interface Authtype {
    type: "signup" | "login"
}
export const Auth = (props: Authtype) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async()=> {
        if (props.type === "signup") {
            if (!username || !email || !password) {
                toast.error("All fields are required!");
                return;
            }
        }
    
        if (props.type === "login") {
            if (!email || !password) {
                toast.error("Email and password are required!");
                return;
            }
        }
        try{
            setLoader(true)
            const res = await axios.post(`http://localhost:4000/${props.type}`, {
                username,
                email,
                password
            });
            const token = res.data.token;
            if (token === undefined){
                toast.error("enter valid password")
            } else {
                localStorage.setItem("token", token);
                navigate("/blogs");
                toast.success("verify successfully")
            }
        }catch(err){
            console.log("error is", err);
        } finally {
            setLoader(false)
        }
    }

    return <div className="h-screen flex justify-center ">
        <div className="flex justify-center items-center">
            <div>
                <div className="px-10 py-8">
                    <div className="text-3xl font-bold">
                        {props.type === "login" ? "Welcome Back!" : "Create an Account"}
                    </div>
                    <div>
                        {props.type === "login" ? "Don't have an account" : "Already have an account?"} <a href={props.type==="signup"? "/login" : "/signup"} className="text-blue-500">{props.type === "signup" ? "Login" : "signup" }</a>
                    </div>
                </div>
                <div>
                    {props.type === "signup" ?  <Lablledinput label="username" type="text" placeholder="Enter your username" onchange={(e)=>{
                        setUsername(e.target.value);
                    }}/> : null}
                    <Lablledinput label="email" type="text" placeholder="Enter your email" onchange={(e)=>{
                        setEmail(e.target.value);
                    }}/> 
                    <Lablledinput label="password" type="password" placeholder="Enter your password" onchange={(e)=>{
                        setPassword(e.target.value);
                    }}/>
                    <button onClick={handleSubmit}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md mt-4 w-full cursor-pointer hover:bg-black">
                        {loader ? <Loader/> : props.type === "login" ? "Login" : "Create an Account"}
                    </button>
                </div>
            </div>
        </div>
    </div>
}

interface lableinputprops {
    label: string;
    placeholder: string;
    onchange : (e: any) => void;
    type?: string;
}

function Lablledinput(props: lableinputprops) {
    return <div className="flex flex-col my-2">
        <label className="font-bold mb-1">{props.label}</label>
        <input type={props.type} placeholder={props.placeholder} onChange={props.onchange} className="border border-gray-300 rounded-md p-2 w-full" />
    </div>
}