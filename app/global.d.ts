export interface electronAPI {
    minimize: () => void;
    toggleMaximize: () => void;
    close: () => void;
}

declare global {
    interface Window {
        electronAPI: electronAPI;
    }
}