import { useState } from "react"
import { WriteNavbar } from "../component/WriteNavbar"

export const Publish = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    return <div>
        <WriteNavbar title={title} content={content}/>
        <div className="flex justify-center mt-24">
        <div className="w-full max-w-3xl px-4">
            <input
            type="text"
            placeholder="Title"
            onChange={(e:any)=>{setTitle(e.target.value)}}
            className="w-full text-5xl font-serif font-semibold text-gray-900 placeholder-gray-400 outline-none mb-6"
            />

            <textarea
            placeholder="Tell your story..."
            onChange={(e:any)=>{setContent(e.target.value)}}
            className="w-full min-h-[300px] text-xl text-gray-800 placeholder-gray-400 outline-none resize-none"
            />
        </div>
        </div>
    </div>   
}