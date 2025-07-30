export type AppMode = 'perf' | 'interactive' | 'ai';

export const getAppMode = (): AppMode => {
    const urlParams = new URLSearchParams(window.location.search);
    // ai is the default mode
    const appModeParam = urlParams.get('debug') || 'ai';

    return appModeParam as AppMode;
};
