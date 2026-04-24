'use client';

import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { AddressManager } from '@/components/profile/AddressManager';
import { OrderHistory } from '@/components/profile/OrderHistory';

export default function ProfilePage() {
    const { profile, updateProfile, isUpdatingProfile, updateUserInfo, isUpdatingUserInfo, addresses, addAddress, deleteAddress, isLoadingAddresses, isAddingAddress } = useUser();
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');

    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8">
                <ProfileSidebar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    logout={logout} 
                />

                <main className="flex-grow">
                    {activeTab === 'profile' && (
                        <ProfileInfo 
                            profile={profile} 
                            onUpdate={updateProfile}
                            isUpdating={isUpdatingProfile}
                            onUpdateUser={updateUserInfo}
                            isUpdatingUser={isUpdatingUserInfo}
                        />
                    )}
                    
                    {activeTab === 'addresses' && (
                        <AddressManager 
                            addresses={addresses}
                            isLoading={isLoadingAddresses}
                            isAdding={isAddingAddress}
                            onAdd={addAddress}
                            onDelete={deleteAddress}
                        />
                    )}

                    {activeTab === 'orders' && <OrderHistory />}
                </main>
            </div>
        </div>
    );
}
