"use client";

export default function WindowControls() {
    function maximize(): void {
        window.electronAPI.toggleMaximize();
    }

    function minimize(): void {
        window.electronAPI.minimize();
    }

    function close(): void {
        window.electronAPI.close();
    }

    return (
        <div className="title-bar flex flex-row items-center justify-start gap-2 p-1 fixed top-0 right-0 left-0">
            <button onClick={close} className="w-3 h-3 bg-red-500 rounded-full text-sm"></button>
            <button onClick={maximize} className="w-3 h-3 bg-green-500 rounded-full"></button>
            <button onClick={minimize} className="w-3 h-3 bg-yellow-500 rounded-full"></button>
        </div>
    )
}