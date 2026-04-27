import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user.service';
import { Address } from '@/types/api/auth';
import toast from 'react-hot-toast';

export const useUser = () => {
    const queryClient = useQueryClient();

    // --- User Info ---
    const userInfoQuery = useQuery({
        queryKey: ['user_info'],
        queryFn: UserService.getUserInfo,
    });

    const updateUserInfoMutation = useMutation({
        mutationFn: (data: any) => UserService.updateUserInfo(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user_info'] });
            toast.success('Account information updated!');
        },
        onError: () => {
            toast.error('Failed to update account information.');
        }
    })

    const updateProfileMutation = useMutation({
        mutationFn: (data: any) => UserService.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile details updated successfully!');
        },
        onError: () => {
            toast.error('Failed to update profile.');
        }
    });

    // --- Addresses ---
    const addressesQuery = useQuery({
        queryKey: ['addresses'],
        queryFn: UserService.listAddresses,
    });

    const addAddressMutation = useMutation({
        mutationFn: (data: Omit<Address, 'id'>) => UserService.addAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('New address added!');
        },
        onError: () => {
            toast.error('Failed to add address.');
        }
    });

    const updateAddressMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) => 
            UserService.updateAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('Address updated!');
        },
        onError: () => {
            toast.error('Failed to update address.');
        }
    });

    const deleteAddressMutation = useMutation({
        mutationFn: (id: number) => UserService.deleteAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
            toast.success('Address removed.');
        },
        onError: () => {
            toast.error('Failed to remove address.');
        }
    });

    return {
        // user Info
        updateUserInfo: updateUserInfoMutation.mutate,
        isUpdatingUserInfo: updateUserInfoMutation.isPending,
        
        // Profile
        profile: userInfoQuery.data?.data,
        isLoadingProfile: userInfoQuery.isLoading,
        updateProfile: updateProfileMutation.mutate,
        isUpdatingProfile: updateProfileMutation.isPending,

        // Addresses
        addresses: addressesQuery.data?.data || [],
        isLoadingAddresses: addressesQuery.isLoading,
        addAddress: addAddressMutation.mutate,
        isAddingAddress: addAddressMutation.isPending,
        updateAddress: updateAddressMutation.mutate,
        isUpdatingAddress: updateAddressMutation.isPending,
        deleteAddress: deleteAddressMutation.mutate,
        isDeletingAddress: deleteAddressMutation.isPending,
    };
};
