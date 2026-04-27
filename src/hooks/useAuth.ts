import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setUser, logout: logoutStore, isAuthenticated: isStoreAuthenticated } = useAuthStore();

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
        onError: (error: any) => {
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
        onError: (error: any) => {
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            toast.error(message);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            logoutStore();
            queryClient.clear();
            toast.success('Logged out successfully');
            router.push('/login');
        },
        onError: () => {
            // Even if API logout fails, we clear local state
            logoutStore();
            queryClient.clear();
            router.push('/login');
        }
    });

    const userInfoQuery = useQuery({
        queryKey: ['user_info'],
        queryFn: UserService.getUserInfo,
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token')
    })

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: UserService.getMyProfile,
        enabled: typeof window !== 'undefined' && !!localStorage.getItem('access_token'),
    });

    // Prioritize query data but fallback to store data for immediate UI updates
    const currentUser = userInfoQuery.data?.data || (typeof window !== 'undefined' && localStorage.getItem('access_token') ? useAuthStore.getState().user : null);

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,

        logout: logoutMutation.mutate,
        
        user: currentUser,
        isAuthenticated: isStoreAuthenticated,
        isLoadingProfile: userInfoQuery.isLoading && !currentUser,
    };
};
