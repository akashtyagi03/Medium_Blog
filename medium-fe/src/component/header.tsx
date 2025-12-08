export function Header() {
    return (
        <header className="bg-white shadow">
            <div className="max-w mx-auto py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <div className="flex">
                    <h1 className="text-3xl text-gray-900 font-sans">
                        Medium Clone
                    </h1>
                    <div className="pl-5">
                        <input type="text" placeholder="search" className="border rounded-2xl p-2" />
                    </div>
                </div>
                <div className="flex px-10 gap-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" viewBox="0 0 24 24" width="35" height="35" role="img" aria-label="Notification bell outline">
                        <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8.5-3 8.5h18s-3-1.5-3-8.5" />
                            <path d="M10 20a2 2 0 0 0 4 0" />
                        </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" viewBox="0 0 24 24" width="35" height="35" role="img" aria-label="Profile icon outline">
                        <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="8" r="3.2" />
                            <path d="M4 20c0-3.2 2.8-5.8 6-5.8h4c3.2 0 6 2.6 6 5.8" />
                        </g>
                    </svg>
                </div>
            </div>
        </header>
    )
}