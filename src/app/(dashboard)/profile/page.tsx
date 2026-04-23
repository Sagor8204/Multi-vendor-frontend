'use client';

import React, { useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function ProfilePage() {
    const { profile, updateProfile, isUpdatingProfile, addresses, addAddress, deleteAddress, isLoadingAddresses } = useUser();
    const { logout } = useAuth();
    
    const [addressForm, setAddressForm] = useState({
        full_name: '',
        phone: '',
        address_line: '',
        city: '',
        postal_code: '',
        country: '',
        is_default: false
    });

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addAddress(addressForm);
        setAddressForm({
            full_name: '',
            phone: '',
            address_line: '',
            city: '',
            postal_code: '',
            country: '',
            is_default: false
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold text-main">Account Settings</h1>
                <Button variant="outline" onClick={() => logout({ refresh: localStorage.getItem('refresh_token') || '' })}>
                    Logout
                </Button>
            </div>

            {/* Profile Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-main">My Profile</h2>
                <Card className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm font-bold text-muted uppercase tracking-wider">Username</p>
                            <p className="text-lg font-medium">{profile?.user.username || 'Loading...'}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-muted uppercase tracking-wider">Email</p>
                            <p className="text-lg font-medium">{profile?.user.email || 'Loading...'}</p>
                        </div>
                        <div className="md:col-span-2">
                             <p className="text-sm font-bold text-muted uppercase tracking-wider">Bio</p>
                             <p className="text-main">{profile?.bio || 'No bio added yet.'}</p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Address Section */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold text-main">Shipping Addresses</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {isLoadingAddresses ? (
                        <p>Loading addresses...</p>
                    ) : (
                        addresses.map((addr: any) => (
                            <Card key={addr.id} className="p-4 relative border-border/60">
                                <div className="font-bold text-main">{addr.full_name}</div>
                                <div className="text-sm text-muted mt-1">
                                    {addr.address_line}, {addr.city}<br />
                                    {addr.postal_code}, {addr.country}
                                </div>
                                <div className="text-xs text-muted mt-2">{addr.phone}</div>
                                <button 
                                    onClick={() => deleteAddress(addr.id)}
                                    className="absolute top-4 right-4 text-error hover:scale-110 transition-transform text-xs font-bold uppercase"
                                >
                                    Remove
                                </button>
                                {addr.is_default && (
                                    <span className="mt-3 inline-block bg-primary/10 text-primary text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                                        Default
                                    </span>
                                )}
                            </Card>
                        ))
                    )}
                </div>

                {/* Add Address Form */}
                <Card className="p-6 mt-6 bg-background-subtle/50">
                    <h3 className="font-bold text-main mb-4">Add New Address</h3>
                    <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                            placeholder="Full Name" 
                            value={addressForm.full_name} 
                            onChange={e => setAddressForm({...addressForm, full_name: e.target.value})}
                        />
                        <Input 
                            placeholder="Phone Number" 
                            value={addressForm.phone} 
                            onChange={e => setAddressForm({...addressForm, phone: e.target.value})}
                        />
                        <div className="md:col-span-2">
                            <Input 
                                placeholder="Street Address" 
                                value={addressForm.address_line} 
                                onChange={e => setAddressForm({...addressForm, address_line: e.target.value})}
                            />
                        </div>
                        <Input 
                            placeholder="City" 
                            value={addressForm.city} 
                            onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                        />
                        <Input 
                            placeholder="Postal Code" 
                            value={addressForm.postal_code} 
                            onChange={e => setAddressForm({...addressForm, postal_code: e.target.value})}
                        />
                        <Input 
                            placeholder="Country" 
                            value={addressForm.country} 
                            onChange={e => setAddressForm({...addressForm, country: e.target.value})}
                        />
                        <div className="md:col-span-2">
                            <Button type="submit" className="w-full">Save Address</Button>
                        </div>
                    </form>
                </Card>
            </section>
        </div>
    );
}
