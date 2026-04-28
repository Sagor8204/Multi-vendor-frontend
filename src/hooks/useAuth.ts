import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getAccessToken, getTokenExpiryTime, hasValidAccessToken } from '@/lib/auth/token';

let sessionExpiryTimer: number | null = null;
let scheduledExpiryTime: number | null = null;
type ApiErrorResponse = {
    message?: string;
};

export const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { user: storeUser, setUser, clearAuth } = useAuthStore();
    const hasAccessToken = hasValidAccessToken();

    const loginMutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: (response) => {
            if (response.success) {
                // Ensure user data exists before setting
                if (response.data?.user) {
                    setUser(response.data.user);
                }
                
                queryClient.invalidateQueries({ queryKey: ['user_info'] });
                
                toast.success(`Welcome back!`, {
                    icon: '👋',
                });
                
                router.push('/');
            } else {
                // Handle success: false case from backend
                toast.error(response.message || 'Login failed. Please check your credentials.');
            }
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
            toast.error(message);
        }
    });

    const registerMutation = useMutation({
        mutationFn: AuthService.register,
        onSuccess: (response) => {
            if (response.success) {
                toast.success('Registration successful! Please login to continue.');
                router.push('/login');
            } else {
                toast.error(response.message || 'Registration failed.');
            }
        },
        onError: (error: AxiosError<ApiErrorResponse>) => {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            clearAuth();
            queryClient.clear();
            toast.success('Logged out successfully');
            router.push('/login');
        },
        onError: () => {
            // Even if API logout fails, we clear local state
            clearAuth();
            queryClient.clear();
            router.push('/login');
        }
    });

    useEffect(() => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            if (storeUser) {
                clearAuth();
            }
            if (sessionExpiryTimer) {
                window.clearTimeout(sessionExpiryTimer);
                sessionExpiryTimer = null;
            }
            scheduledExpiryTime = null;
            return;
        }

        const expiryTime = getTokenExpiryTime(accessToken);

        if (!expiryTime || expiryTime <= Date.now()) {
            clearAuth();
            queryClient.clear();
            scheduledExpiryTime = null;
            toast.error('Session expired. Please sign in again.');
            return;
        }

        if (sessionExpiryTimer && scheduledExpiryTime === expiryTime) {
            return;
        }

        if (sessionExpiryTimer) {
            window.clearTimeout(sessionExpiryTimer);
        }

        scheduledExpiryTime = expiryTime;
        sessionExpiryTimer = window.setTimeout(() => {
            clearAuth();
            queryClient.clear();
            toast.error('Session expired. Please sign in again.');
            sessionExpiryTimer = null;
            scheduledExpiryTime = null;
        }, expiryTime - Date.now());
    }, [clearAuth, queryClient, storeUser]);

    const userInfoQuery = useQuery({
        queryKey: ['user_info'],
        queryFn: UserService.getUserInfo,
        enabled: hasAccessToken,
    });

    useEffect(() => {
        if (userInfoQuery.data?.success && userInfoQuery.data.data) {
            setUser(userInfoQuery.data.data);
        }
    }, [setUser, userInfoQuery.data]);

    useEffect(() => {
        const status = (userInfoQuery.error as AxiosError | null)?.response?.status;

        if (status === 401) {
            clearAuth();
        }
    }, [clearAuth, userInfoQuery.error]);

    const currentUser = hasAccessToken ? userInfoQuery.data?.data || storeUser : null;

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,

        logout: logoutMutation.mutate,
        
        user: currentUser,
        isAuthenticated: hasAccessToken && !!currentUser,
        isLoadingProfile: userInfoQuery.isLoading && !currentUser,
    };
};
