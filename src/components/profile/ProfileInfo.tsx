'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfileInfoProps {
    profile: any;
}

export const ProfileInfo = ({ profile }: ProfileInfoProps) => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="p-8 border-none shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-3xl bg-primary/10 border-4 border-white shadow-xl overflow-hidden relative">
                            {profile?.profile?.profile_image ? (
                                <Image 
                                    src={profile.profile.profile_image} 
                                    alt="profile" 
                                    fill 
                                    unoptimized
                                    className="object-cover" 
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-black text-primary uppercase">
                                    {profile?.username?.substring(0, 2)}
                                </div>
                            )}
                        </div>
                        <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-xl border border-border/40 text-primary hover:scale-110 transition-transform cursor-pointer">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-grow text-center md:text-left pt-2">
                        <h2 className="text-2xl font-black text-main">{profile?.username}</h2>
                        <p className="text-muted font-bold mt-1 uppercase tracking-widest text-[10px]">{profile?.role} Account</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div>
                                <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Email Address</label>
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-border/40 text-sm font-bold text-main">
                                    {profile?.email}
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Phone Number</label>
                                <div className="p-4 bg-slate-50/50 rounded-2xl border border-border/40 text-sm font-bold text-main">
                                    {profile?.profile?.phone || 'Not provided'}
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-black text-muted uppercase tracking-widest mb-2 block">Bio</label>
                                <div className="p-6 bg-slate-50/50 rounded-2xl border border-border/40 text-sm font-bold text-main leading-relaxed italic">
                                    "{profile?.profile?.bio || 'No bio added yet. Tell us about yourself!'}"
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                            <Button className="rounded-2xl px-8 py-6 h-auto text-sm font-black shadow-lg shadow-primary/20">
                                Update Profile
                            </Button>
                            <Button variant="outline" className="rounded-2xl px-8 py-6 h-auto text-sm font-black border-border/60">
                                Change Password
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};
