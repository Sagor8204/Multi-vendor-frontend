export const getAccessToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('access_token');
};

export const getRefreshToken = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return localStorage.getItem('refresh_token');
};

export const clearStoredTokens = () => {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

const parseJwtPayload = (token: string) => {
    try {
        const payload = token.split('.')[1];

        if (!payload) {
            return null;
        }

        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), '=');
        const decoded = window.atob(padded);

        return JSON.parse(decoded) as { exp?: number };
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
