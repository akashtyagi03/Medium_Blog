interface NotificationiconProps {
    size?: number;
}
export const Notificationicon = ({size}: NotificationiconProps) => {
    return <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer text-slate-500" viewBox="0 0 24 24" width={size} height={size} role="img" aria-label="Notification bell outline">
        <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8a6 6 0 1 0-12 0c0 7-3 8.5-3 8.5h18s-3-1.5-3-8.5" />
            <path d="M10 20a2 2 0 0 0 4 0" />
        </g>
    </svg>
}