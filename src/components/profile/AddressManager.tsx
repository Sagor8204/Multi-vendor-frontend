'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { MapPin, Plus, Trash2, CheckCircle2, Settings } from 'lucide-react';
import { AddAddressModal } from './AddAddressModal';

interface AddressManagerProps {
    addresses: any[];
    isLoading: boolean;
    isAdding: boolean;
    onAdd: (data: any) => void;
    onDelete: (id: number) => void;
}

export const AddressManager = ({ addresses, isLoading, isAdding, onAdd, onDelete }: AddressManagerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-2xl font-black text-main tracking-tight">Shipping Addresses</h2>
                    <p className="text-sm text-muted font-bold mt-1">Manage where your orders are delivered</p>
                </div>
                <Button 
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-2xl flex items-center space-x-2 h-14 px-6 shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-black text-sm">Add New</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-2 h-60 flex items-center justify-center text-muted font-bold italic bg-white rounded-[32px] border-2 border-dashed border-border/40">
                        Loading your addresses...
                    </div>
                ) : addresses.length > 0 ? (
                    addresses.map((addr: any) => (
                        <Card key={addr.id} className="p-8 relative border-none shadow-sm hover:shadow-xl transition-all group overflow-hidden bg-white rounded-[32px]">
                            {addr.is_default && (
                                <div className="absolute top-0 right-0 bg-primary px-4 py-2 rounded-bl-[20px]">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Default</span>
                                </div>
                            )}
                            
                            <div className="flex items-start space-x-5">
                                <div className="bg-primary/10 p-4 rounded-[20px] text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-lg font-black text-main mb-1">{addr.full_name}</h4>
                                    <div className="text-sm font-bold text-muted leading-relaxed space-y-0.5">
                                        <p>{addr.address_line}</p>
                                        <p>{addr.city}, {addr.postal_code}</p>
                                        <p>{addr.country}</p>
                                    </div>
                                    <div className="mt-4 inline-flex items-center px-3 py-1 bg-slate-50 rounded-full border border-border/40">
                                        <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-primary" />
                                        <span className="text-[11px] font-black text-main opacity-70">{addr.phone}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 flex items-center justify-end space-x-3 border-t border-border/40 pt-6">
                                <button className="flex items-center space-x-2 px-4 py-2 rounded-xl text-muted hover:text-primary hover:bg-primary/5 transition-all font-bold text-xs">
                                    <Settings className="w-4 h-4" />
                                    <span>Edit</span>
                                </button>
                                <button 
                                    onClick={() => onDelete(addr.id)}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-muted hover:text-error hover:bg-error/5 transition-all font-bold text-xs"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span>Remove</span>
                                </button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-2 py-24 bg-white rounded-[40px] border-2 border-dashed border-border/60 flex flex-col items-center justify-center text-center px-6">
                        <div className="bg-slate-50 p-8 rounded-[32px] mb-6">
                            <MapPin className="w-10 h-10 text-muted/40" />
                        </div>
                        <h3 className="text-xl font-black text-main">No Addresses Yet</h3>
                        <p className="text-sm text-muted font-bold mt-2 max-w-xs leading-relaxed">Add your first shipping address to experience a faster checkout process!</p>
                        <Button 
                            onClick={() => setIsModalOpen(true)}
                            className="mt-8 rounded-2xl px-8 h-14 font-black shadow-lg shadow-primary/20"
                        >
                            Add New Address
                        </Button>
                    </div>
                )}
            </div>

            <AddAddressModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={onAdd}
                isAdding={isAdding}
            />
        </div>
    );
};
