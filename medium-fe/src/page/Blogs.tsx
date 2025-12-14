import { Blogcard } from "../component/Blogcard"
import { Header } from "../component/header"
import { useblogs } from "../hooks"

export const Blogs = () => {
    const { blogs, loading } = useblogs()
    console.log(blogs)

    if (loading) {
        return <div className="pt-20 text-center text-2xl font-semibold">
            loadiing..
        </div>
    }

    return <div>
        <div className="">
        <Header />
        </div>
        <div className="flex justify-center">
            <div className="max-w-xl pt-15">
                {blogs.map((blog) =>
                    <Blogcard
                        id={blog.id}
                        authorName={blog.author.username}
                        title={blog.title}
                        content={blog.content}
                    />
                )}
            </div>
        </div>
    </div>
}