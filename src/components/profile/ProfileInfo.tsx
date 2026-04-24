import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { UpdateProfileModal } from './UpdateProfileModal';

interface ProfileInfoProps {
    profile: any;
    onUpdate: (data: FormData, options?: any) => void;
    isUpdating: boolean;
    onUpdateUser: (userData: any, options?: any) => void;
    isUpdatingUser: boolean;
}

export const ProfileInfo = ({ profile, onUpdate, isUpdating, onUpdateUser }: ProfileInfoProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = (data: FormData) => {
        onUpdate(data, {
            onSuccess: () => {
                const userData = {
                    username: data.get("username"),
                    first_name: data.get("first_name"),
                    last_name: data.get("last_name"),
                };

                onUpdateUser(userData);
                setIsModalOpen(false);
            },
        });
    };

    const fullName = profile?.first_name && profile?.last_name 
        ? `${profile.first_name} ${profile.last_name}` 
        : profile?.username;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-0 border-none shadow-sm overflow-hidden bg-white rounded-[32px]">
                {/* Header Decoration */}
                <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent w-full" />
                
                <div className="px-8 pb-8 -mt-16">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
                        <div className="relative group">
                            <div className="w-40 h-40 rounded-[40px] bg-white border-8 border-white shadow-2xl overflow-hidden relative">
                                {profile?.profile?.profile_image ? (
                                    <Image 
                                        src={profile.profile.profile_image} 
                                        alt="profile" 
                                        fill 
                                        unoptimized
                                        className="object-cover" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-black text-primary bg-primary/5">
                                        {profile?.username?.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="absolute bottom-2 right-2 bg-primary p-3 rounded-2xl shadow-xl text-white hover:scale-110 transition-transform cursor-pointer border-4 border-white"
                            >
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-grow text-center md:text-left pb-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <h2 className="text-3xl font-black text-main tracking-tight">{fullName}</h2>
                                <span className="inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest w-fit mx-auto md:mx-0">
                                    {profile?.role}
                                </span>
                            </div>
                            <p className="text-muted font-bold mt-1">@{profile?.username}</p>
                        </div>

                        <div className="flex gap-3">
                            <Button 
                                onClick={() => setIsModalOpen(true)}
                                className="rounded-2xl px-6 py-3 h-auto text-sm font-black shadow-lg shadow-primary/20"
                            >
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-50/50 rounded-[24px] border border-border/40">
                            <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Email Address</label>
                            <p className="text-sm font-bold text-main">{profile?.email}</p>
                        </div>
                        <div className="p-6 bg-slate-50/50 rounded-[24px] border border-border/40">
                            <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Phone Number</label>
                            <p className="text-sm font-bold text-main">{profile?.profile?.phone || 'Not provided'}</p>
                        </div>
                        <div className="p-6 bg-slate-50/50 rounded-[24px] border border-border/40">
                            <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Date of Birth</label>
                            <p className="text-sm font-bold text-main">
                                {profile?.profile?.date_of_birth 
                                    ? new Date(profile.profile.date_of_birth).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                      })
                                    : 'Not provided'}
                            </p>
                        </div>
                        <div className="md:col-span-2 lg:col-span-3 p-8 bg-slate-50/50 rounded-[32px] border border-border/40">
                            <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-3 block">About Me</label>
                            <p className="text-sm font-bold text-main leading-relaxed italic opacity-80">
                                {profile?.profile?.bio ? `"${profile.profile.bio}"` : 'No bio added yet. Tell us about yourself!'}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 border-none shadow-sm bg-white rounded-[32px] flex flex-col justify-between">
                    <div>
                        <h3 className="font-black text-main text-lg mb-2">Security</h3>
                        <p className="text-xs text-muted font-bold mb-6">Manage your password and account security settings.</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl py-3 h-auto text-sm font-black border-border hover:bg-primary hover:text-white">
                        Change Password
                    </Button>
                </Card>
                <Card className="p-8 border-none shadow-sm bg-white rounded-[32px] flex flex-col justify-between">
                    <div>
                        <h3 className="font-black text-main text-lg mb-2">Account Type</h3>
                        <p className="text-xs text-muted font-bold mb-6">You are currently using a {profile?.role} account.</p>
                    </div>
                    <Button variant="outline" className="w-full rounded-2xl py-3 h-auto text-sm font-black border-border" disabled>
                        Switch to {profile?.role === 'vendor' ? 'Customer' : 'Vendor'}
                    </Button>
                </Card>
            </div>

            <UpdateProfileModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                profile={profile}
                onUpdate={handleUpdate}
                isUpdating={isUpdating}
            />
        </div>
    );
};
