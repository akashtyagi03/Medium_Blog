import axios from "axios"
import { useEffect, useState } from "react"

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useblog = ({ id }:{ id:string }) =>{
    const [blogs, setBlogs] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        axios.get(`${backendUrl}blog/${id}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setBlogs(res.data.blogs);
                setLoading(false);
            })
            .catch(err => {
                console.log("Axios error:", err);
                setLoading(false);
            });
    }, [id]);


    return {
        loading,
        blogs
    }
}

export const useblogs = () => {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {

        axios.get(`${backendUrl}blog/bluk`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                setBlogs(res.data.blukblogs);
                setLoading(false);
            })
            .catch(err => {
                console.log("Axios error:", err);
                setLoading(false);
            });
    }, []);


    return {
        loading,
        blogs
    }
}