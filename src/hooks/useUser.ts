import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '@/services/user.service';
import { Address } from '@/types/api/auth';

export const useUser = () => {
    const queryClient = useQueryClient();

    // --- Profile ---
    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: UserService.getMyProfile,
    });

    const updateProfileMutation = useMutation({
        mutationFn: (data: any) => UserService.updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
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
        },
    });

    const updateAddressMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Address> }) => 
            UserService.updateAddress(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });

    const deleteAddressMutation = useMutation({
        mutationFn: (id: number) => UserService.deleteAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });

    return {
        // Profile
        profile: profileQuery.data?.data,
        isLoadingProfile: profileQuery.isLoading,
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
