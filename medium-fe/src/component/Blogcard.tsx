import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title?: string;
    content?: string;
    id?: number
}

export const Blogcard = ({
    id,
    authorName,
    title,
    content
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`} >
        <div className="border-b border-slate-200 p-5 px-10 cursor-pointer hover:bg-gray-50 transition">
            <div className="flex items-center gap-2 mb-2">
                <Avatar name={authorName} />
                <span className="text-sm text-gray-600">{authorName}</span>
                <span className="text-gray-400 text-sm">•</span>
            </div>
            <h2 className="text-xl font-semibold mb-1">
                {title}
            </h2>
            <p className="text-gray-700 text-sm line-clamp-2">
                {(content ?? "").slice(0, 100) + "..."}
                {/* {content} */}
            </p>
        </div>
    </Link>
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
            {name[0].toUpperCase()}
        </div>
    );
}
