'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Camera, CheckCircle2, Save, X } from 'lucide-react';
import Image from 'next/image';

interface UpdateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    profile: any;
    onUpdate: (data: FormData) => void;
    isUpdating: boolean;
}

export const UpdateProfileModal = ({ isOpen, onClose, profile, onUpdate, isUpdating }: UpdateProfileModalProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        bio: '',
        date_of_birth: '',
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username || '',
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                email: profile.email || '',
                phone: profile.profile?.phone || '',
                bio: profile.profile?.bio || '',
                date_of_birth: profile.profile?.date_of_birth || '',
            });
            setPreview(profile.profile?.profile_image || null);
        }
    }, [profile, isOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('username', formData.username);
        data.append('first_name', formData.first_name);
        data.append('last_name', formData.last_name);
        data.append('phone', formData.phone);
        data.append('bio', formData.bio);
        if (formData.date_of_birth) {
            data.append('date_of_birth', formData.date_of_birth);
        }
        if (imageFile) {
            data.append('profile_image', imageFile);
        }
        onUpdate(data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Profile Information">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative">
                        <div className="w-32 h-32 rounded-3xl bg-slate-50 border-4 border-white shadow-xl overflow-hidden relative">
                            {preview ? (
                                <Image src={preview} alt="preview" fill className="object-cover" unoptimized />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-primary uppercase">
                                    {formData.username.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute -bottom-2 -right-2 bg-primary p-2.5 rounded-2xl shadow-xl text-white hover:scale-110 transition-transform cursor-pointer"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                    />
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest">Click to change avatar</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">First Name</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            value={formData.first_name}
                            onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Last Name</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            value={formData.last_name}
                            onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Username</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2 flex justify-between">
                            <span>Email Address</span>
                            <span className="text-primary flex items-center bg-primary/5 px-2 py-0.5 rounded-full lowercase tracking-normal">
                                <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> verified
                            </span>
                        </label>
                        <Input 
                            className="rounded-2xl border-border/40 h-14 font-bold bg-slate-50/50 cursor-not-allowed opacity-70"
                            value={formData.email}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Phone Number</label>
                        <Input 
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Date of Birth</label>
                        <Input 
                            type="date"
                            className="rounded-2xl border-border/60 h-14 font-bold"
                            value={formData.date_of_birth}
                            onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                        />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black text-muted uppercase tracking-widest px-2">Bio</label>
                        <textarea 
                            className="w-full min-h-[120px] rounded-2xl border border-border/60 p-4 font-bold text-sm focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/5 transition-all bg-white"
                            placeholder="Tell us about yourself..."
                            value={formData.bio}
                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                        ></textarea>
                    </div>
                </div>

                <div className="flex items-center space-x-4 pt-4">
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
                        disabled={isUpdating}
                        className="flex-[2] items-center justify-center flex rounded-2xl h-14 text-sm font-black shadow-lg shadow-primary/20 space-x-2"
                    >
                        <Save className="w-4 h-4" />
                        <span>{isUpdating ? 'Saving Changes...' : 'Save Profile'}</span>
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
