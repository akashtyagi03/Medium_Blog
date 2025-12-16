import { Blogcard } from "../component/Blogcard"
import { Bloagskeleton } from "../component/Blogskeleton"
import { Header } from "../component/header"
import { useblogs } from "../hooks"

export const Blogs = () => {
    const { blogs, loading } = useblogs()

    if (loading) {
        return <div>
            <Header />
            <div  className="pt-20 text-center text-2xl font-semibold">
                <Bloagskeleton/>
                <Bloagskeleton/>
                <Bloagskeleton/>
            </div>
        </div> 
    }

    return <div>
        <Header />
        <div className="flex justify-center">
            <div className="max-w-xl pt-16">
                {blogs.map((blog) =>
                    <Blogcard
                        key={blog.id}
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