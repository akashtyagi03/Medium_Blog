// import { Link } from "react-router-dom";

// interface BlogCardProps {
//     authorName: string;
//     title?: string;
//     content?: string;
//     id?: number
// }

// export const Blogcard = ({
//     id,
//     authorName,
//     title,
//     content
// }: BlogCardProps) => {
//     return <Link to={`/blog/${id}`} >
//         <div className="border-b border-slate-200 p-5 px-10 cursor-pointer hover:bg-gray-50 transition">
//             <div className="flex items-center gap-2 mb-2">
//                 <Avatar name={authorName} />
//                 <span className="text-sm text-gray-600">{authorName}</span>
//                 <span className="text-gray-400 text-sm">•</span>
//             </div>
//             <h2 className="text-xl font-semibold mb-1">
//                 {title}
//             </h2>
//             <p className="text-gray-700 text-sm line-clamp-2">
//                 {(content ?? "").slice(0, 100) + "..."}
//             </p>
//         </div>
//     </Link>
// }

// export function Avatar({ name }: { name: string }) {
//     return (
//         <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
//             {name[0].toUpperCase()}
//         </div>
//     );
// }

import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedAt?: string;
  readTime?: string;
}

export const Blogcard = ({
  id,
  authorName,
  title,
  content,
  publishedAt = "Oct 20",
  readTime = "5 min read",
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="flex gap-6 border-b border-gray-200 py-6 px-5 hover:bg-gray-50 transition">

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Avatar name={authorName} />
            <span className="text-sm font-medium text-gray-700">
              {authorName}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 leading-snug mb-2">
            {title}
          </h2>

          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {(content ?? "").slice(0, 100) + "..."}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{publishedAt}</span>
            <span>·</span>
            <span>{readTime}</span>
          </div>
        </div>

        {/* image
        <div className="w-28 h-20 bg-gray-200 rounded-md shrink-0">
          {/* thumbnail placeholder */}
        {/* </div> */}
      </div>
    </Link>
  );
};


export function Avatar({ name }: { name: string }) {
  return (
    <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold">
      {name[0].toUpperCase()}
    </div>
  );
}