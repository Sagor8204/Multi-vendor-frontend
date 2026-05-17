"use client";

import React, { Suspense, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileInfo } from "@/components/profile/ProfileInfo";
import { AddressManager } from "@/components/profile/AddressManager";
import { OrderHistory } from "@/components/profile/OrderHistory";

function ProfileContent() {
  const {
    profile,
    updateProfile,
    isUpdatingProfile,
    updateUserInfo,
    isUpdatingUserInfo,
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    isLoadingAddresses,
    isAddingAddress,
    isUpdatingAddress,
  } = useUser();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "profile" | "addresses" | "orders"
  >("profile");

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <ProfileSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          logout={logout}
        />

        <main className="flex-grow">
          {activeTab === "profile" && (
            <ProfileInfo
              profile={profile}
              onUpdate={updateProfile}
              isUpdating={isUpdatingProfile}
              onUpdateUser={updateUserInfo}
              isUpdatingUser={isUpdatingUserInfo}
            />
          )}

          {activeTab === "addresses" && (
            <AddressManager
              addresses={addresses}
              isLoading={isLoadingAddresses}
              isAdding={isAddingAddress}
              isUpdating={isUpdatingAddress}
              onAdd={addAddress}
              onUpdate={updateAddress}
              onDelete={deleteAddress}
            />
          )}

          {activeTab === "orders" && <OrderHistory />}
        </main>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background-subtle/30 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
