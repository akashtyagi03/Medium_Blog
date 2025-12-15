import { useParams } from "react-router-dom";
import { useblog } from "../hooks"

export const blog = ()=>{
    const { id } = useParams();
    const {blogs, loading} = useblog({
        id: id || ""
    });

    if(loading){
        return <div className="pt-20 text-center text-2xl font-semibold">
            loadiing..
        </div>
    }

    return <div>
        Blog Page
    </div>
}