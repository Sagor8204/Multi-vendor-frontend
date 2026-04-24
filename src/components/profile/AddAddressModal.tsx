'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MapPin, Save } from 'lucide-react';

interface AddAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
    isAdding: boolean;
}

export const AddAddressModal = ({ isOpen, onClose, onAdd, isAdding }: AddAddressModalProps) => {
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
        // Reset form after submission (assuming success or let parent handle it)
        setAddressForm({
            full_name: '',
            phone: '',
            address_line: '',
            city: '',
            postal_code: '',
            country: '',
            is_default: false
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Shipping Address">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-4 mb-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 text-primary">
                    <MapPin className="w-5 h-5" />
                    <p className="text-xs font-bold leading-relaxed">
                        Please provide accurate details to ensure your orders reach you without any delay.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Full Name</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold px-5"
                            placeholder="e.g. John Doe" 
                            value={addressForm.full_name} 
                            onChange={e => setAddressForm({...addressForm, full_name: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Phone Number</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold px-5"
                            placeholder="+1 (555) 000-0000" 
                            value={addressForm.phone} 
                            onChange={e => setAddressForm({...addressForm, phone: e.target.value})}
                            required
                        />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Street Address</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold px-5"
                            placeholder="House No, Street, Landmark" 
                            value={addressForm.address_line} 
                            onChange={e => setAddressForm({...addressForm, address_line: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">City</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold px-5"
                            placeholder="New York" 
                            value={addressForm.city} 
                            onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                            required
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Postal Code</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold px-5"
                            placeholder="10001" 
                            value={addressForm.postal_code} 
                            onChange={e => setAddressForm({...addressForm, postal_code: e.target.value})}
                            required
                        />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Country</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold px-5"
                            placeholder="United States" 
                            value={addressForm.country} 
                            onChange={e => setAddressForm({...addressForm, country: e.target.value})}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4 pt-6">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onClose}
                        className="flex-1 rounded-2xl h-14 text-sm font-black border-border/60"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        disabled={isAdding}
                        className="flex-[2] items-center justify-center flex rounded-2xl h-14 text-sm font-black shadow-lg shadow-primary/20 space-x-2"
                    >
                        <Save className="w-4 h-4" />
                        <span>{isAdding ? 'Saving...' : 'Save Address'}</span>
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
