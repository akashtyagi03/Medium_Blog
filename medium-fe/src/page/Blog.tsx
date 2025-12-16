import { useParams } from "react-router-dom";
import { useblog } from "../hooks"
import { Header } from "../component/header";
import { Bloagskeleton } from "../component/Blogskeleton";

export const Blog = ()=>{
    const { id } = useParams();
    const {blog, loading} = useblog({
        id: id || ""
    });

    if(loading){
        return <div className="pt-20 text-center text-2xl font-semibold">
            <Bloagskeleton/>
        </div>
    }

    return <div >
            <Header />  
        <div className="pt-30 px-15 flex justify-center flex-col max-w-5xl mx-auto bg-slate-50 p-5">
            <div className="font-extrabold text-4xl">
                {blog?.title}
            </div>
            <div>
                posted by <span className="font-semibold">{blog?.author.username}</span>
            </div>
            <div className="pt-4 text-slate-500 text-2xl">
                {blog?.content}
            </div>
        </div>
    </div>
}