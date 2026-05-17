export const getAccessToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    // Try cookies first (standard for server/client sync)
    const match = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'));
    if (match) return match[2];

    return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    const match = document.cookie.match(new RegExp('(^| )refresh_token=([^;]+)'));
    if (match) return match[2];

    return localStorage.getItem('refresh_token');
};

export const clearStoredTokens = () => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export const setTokens = (access: string, refresh: string) => {
    if (typeof window === 'undefined') return;

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    
    // Set cookies for Middleware visibility
    const maxAge = 7 * 24 * 60 * 60; // 7 days
    document.cookie = `access_token=${access}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `refresh_token=${refresh}; path=/; max-age=${maxAge}; SameSite=Lax`;
};

const parseJwtPayload = (token: string) => {
    try {
        const payload = token.split('.')[1];

        if (!payload) {
            return null;
        }

        // Native atob is available in Edge Runtime and modern browsers
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded) as { exp?: number; role?: string };
    } catch {
        return null;
    }
};

export const getTokenExpiryTime = (token: string) => {
    const payload = parseJwtPayload(token);
    return payload?.exp ? payload.exp * 1000 : null;
};

export const isTokenExpired = (token: string) => {
    const expiryTime = getTokenExpiryTime(token);

    if (!expiryTime) {
        return true;
    }

    return Date.now() >= expiryTime;
};

export const hasValidAccessToken = () => {
    const token = getAccessToken();
    return !!token && !isTokenExpired(token);
};
