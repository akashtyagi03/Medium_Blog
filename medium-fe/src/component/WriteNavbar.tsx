import axios from "axios";
import { Notificationicon } from "./Notificationicon";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL
interface WriteNavbarProps {
    username?: any;
    title?: string;
    content?: string;
}

export const WriteNavbar = ({ title, content}: WriteNavbarProps) => {
    const navigate = useNavigate();
    const {user} = useUserStore();
    console.log(user?.username)

    const handlesuubmit=  async ()=>{
        const toastId = toast.loading("Publishing blog...");
        await axios.post(`${backendUrl}blog`,{
            title,
            content
        },{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res=>{
            console.log("blog published", res.data.blog)
            toast.success("Blog published successfully", { id: toastId });
            navigate(`/blog/${res.data.blog.id}`)
        })
    }

    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-white  z-50">
            <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">

                <div className="flex items-center gap-3">
                    <Link to="/blogs">
                        <span className="text-3xl text-gray-900 font-sans">Medium</span>
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-full hover:bg-green-700 transition" 
                        onClick={()=>{handlesuubmit()}}
                        >
                        Publish
                    </button>

                    <Notificationicon size={25} />

                    <div className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
                        {user?.username[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </div>
    );
};
