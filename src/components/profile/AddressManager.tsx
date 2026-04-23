'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MapPin, Plus, Trash2, CheckCircle2, Settings } from 'lucide-react';

interface AddressManagerProps {
    addresses: any[];
    isLoading: boolean;
    isAdding: boolean;
    onAdd: (data: any) => void;
    onDelete: (id: number) => void;
}

export const AddressManager = ({ addresses, isLoading, isAdding, onAdd, onDelete }: AddressManagerProps) => {
    const [addressForm, setAddressForm] = useState({
        full_name: '',
        phone: '',
        address_line: '',
        city: '',
        postal_code: '',
        country: '',
        is_default: false
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(addressForm);
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
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-black text-main tracking-tight">Shipping Addresses</h2>
                    <p className="text-xs text-muted font-bold mt-1">Add or manage where your orders are shipped</p>
                </div>
                <Button className="rounded-2xl space-x-2 h-12 shadow-md shadow-primary/10">
                    <Plus className="w-4 h-4" />
                    <span>Add New</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-2 h-40 flex items-center justify-center text-muted font-bold italic">Loading your addresses...</div>
                ) : addresses.length > 0 ? (
                    addresses.map((addr: any) => (
                        <Card key={addr.id} className="p-6 relative border-none shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                            {addr.is_default && (
                                <div className="absolute top-0 right-0 bg-primary/10 px-4 py-1.5 rounded-bl-2xl">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Default Address</span>
                                </div>
                            )}
                            
                            <div className="flex items-start space-x-4">
                                <div className="bg-primary/5 p-3 rounded-2xl text-primary">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-black text-main">{addr.full_name}</h4>
                                    <p className="text-xs font-bold text-muted mt-2 leading-relaxed">
                                        {addr.address_line}, {addr.city}<br />
                                        {addr.postal_code}, {addr.country}
                                    </p>
                                    <p className="text-[10px] font-black text-main mt-4 uppercase tracking-tighter opacity-60 flex items-center">
                                        <CheckCircle2 className="w-3 h-3 mr-1 text-primary" /> Verified Contact: {addr.phone}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex items-center justify-end space-x-2 border-t border-border/40 pt-4">
                                <button className="p-2 text-muted hover:text-primary transition-colors cursor-pointer">
                                    <Settings className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => onDelete(addr.id)}
                                    className="p-2 text-muted hover:text-error transition-colors cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-2 py-20 bg-white rounded-3xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center text-center">
                        <div className="bg-slate-50 p-6 rounded-full mb-4">
                            <MapPin className="w-8 h-8 text-muted" />
                        </div>
                        <h3 className="font-black text-main">No Addresses Yet</h3>
                        <p className="text-xs text-muted font-bold mt-1">Add your first shipping address to start shopping!</p>
                    </div>
                )}
            </div>

            {/* Add Address Form */}
            <Card className="p-8 border-none shadow-sm mt-12 overflow-hidden">
                <div className="border-b border-border/60 pb-6 mb-8">
                    <h3 className="text-lg font-black text-main">Add New Shipping Destination</h3>
                    <p className="text-xs text-muted font-bold mt-1">Please ensure all details are correct for smooth delivery</p>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Full Name</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            placeholder="e.g. John Doe" 
                            value={addressForm.full_name} 
                            onChange={e => setAddressForm({...addressForm, full_name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Phone Number</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            placeholder="+1 (555) 000-0000" 
                            value={addressForm.phone} 
                            onChange={e => setAddressForm({...addressForm, phone: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Street Address</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            placeholder="House No, Street, Landmark" 
                            value={addressForm.address_line} 
                            onChange={e => setAddressForm({...addressForm, address_line: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">City</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            placeholder="New York" 
                            value={addressForm.city} 
                            onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Postal Code</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            placeholder="10001" 
                            value={addressForm.postal_code} 
                            onChange={e => setAddressForm({...addressForm, postal_code: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Country</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            placeholder="United States" 
                            value={addressForm.country} 
                            onChange={e => setAddressForm({...addressForm, country: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2 pt-4">
                        <Button type="submit" disabled={isAdding} className="w-full rounded-2xl h-14 text-sm font-black shadow-lg shadow-primary/20">
                            {isAdding ? 'Saving...' : 'Securely Save Address'}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
