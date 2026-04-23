import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { setUser, logout: logoutStore } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: AuthService.login,
        onSuccess: (response) => {
            if (response.success) {
                setUser(response.data.user);
                queryClient.invalidateQueries({ queryKey: ['user_info'] });
                router.push('/');
            }
        },
    });

    const registerMutation = useMutation({
        mutationFn: AuthService.register,
        onSuccess: (response) => {
            if (response.success) {
                router.push('/login');
            }
        },
    });

    const logoutMutation = useMutation({
        mutationFn: AuthService.logout,
        onSuccess: () => {
            logoutStore();
            queryClient.clear();
            router.push('/login');
        },
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

    return {
        login: loginMutation.mutate,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        
        register: registerMutation.mutate,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,

        logout: logoutMutation.mutate,
        
        user: userInfoQuery.data?.data,
        isAuthenticated: true,
        isLoadingProfile: userInfoQuery.isLoading,
    };
};
