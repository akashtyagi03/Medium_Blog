import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8f4]">
      <nav className="border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
    
          <h1 className="text-3xl text-gray-900 font-sans">Medium</h1>

          <div className="flex items-center gap-6 text-sm">
            <button onClick={() => navigate("/login")}
              className="cursor-pointer">Sign in</button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-black text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-24 flex justify-between gap-8">
        <div>
          <h1 className="text-8xl font-serif leading-tight max-w-3xl">
            Human <br /> stories & ideas
          </h1>
          <p className="text-xl text-gray-700 max-w-xl">
            A place to read, write, and deepen your understanding
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-8 py-3 mt-4 rounded-full w-fit text-lg cursor-pointer"
          >
            Start reading
          </button>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute right-0 top-0 w-72 h-72 bg-green-500 rounded-lg"></div>
          <div className="absolute right-20 top-24 w-40 h-40 bg-green-400 rounded-full opacity-90"></div>
          <div className="absolute right-10 top-56 w-24 h-24 border border-black rounded-full"></div>
        </div>
      </div>

      <footer className="border-t border-gray-300 py-4">
        <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600">
          Built by  <a href="https://github.com/akashtyagi03">
            <span className="font-medium">Akash Tyagi❤️🧑💻</span>
          </a>
        </div>
      </footer>
    </div>
  );
};
