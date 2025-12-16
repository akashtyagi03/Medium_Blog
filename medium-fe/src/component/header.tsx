import { Link } from "react-router-dom";
import { PencilIcon } from "./Pencilicon";
import { Notificationicon } from "./Notificationicon";
import { useUserStore } from "../store/useUserStore";

export function Header() {
    const {user} = useUserStore();
    console.log(user?.username)

    return (
        <header className="bg-white shadow px-20 h-16 fixed top-0 left-0 w-full z-50 ">
            <div className="max-w mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex">
                    <Link to="/blogs" className="text-3xl text-gray-900 font-sans">
                        Medium
                    </Link>
                    <div className="pl-5">
                        <input type="text" placeholder="search" className="border rounded-2xl p-2" />
                    </div>
                </div>
                <div className="flex items-center px-10 gap-5">
                    <Link to="/publish">
                        <button className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                            <PencilIcon />
                            <span>Write</span>
                        </button>
                    </Link>
                    <Notificationicon size={25} />
                    {/* // add profile functionality later here */}
                    <div className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-800 font-medium">
                        {user?.username[0].toUpperCase()}
                    </div>
                </div>
            </div>
        </header>
    )
}