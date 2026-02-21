import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';
import ProfileMiddleContent from '../components/ProfileMiddleContent';
import ProfileRightSidebar from '../components/ProfileRightSidebar';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/auth');
                return;
            }

            try {
                const res = await fetch('http://localhost:5000/api/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                } else {
                    // Token might be expired
                    localStorage.removeItem('token');
                    navigate('/auth');
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex-1 flex justify-center items-center h-full bg-[#120a06]">
                <div className="text-[var(--color-primary)] animate-pulse font-bold text-xl">Loading Arena Profile...</div>
            </div>
        );
    }

    if (!userData) return null;

    return (
        <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-6 custom-scrollbar text-sm">

            {/* Left Sidebar */}
            <div className="w-full md:w-80 flex flex-col gap-6 flex-shrink-0">
                <ProfileSidebar user={userData} />
            </div>

            {/* Main Content (Middle + Right) */}
            <div className="flex-1 flex flex-col lg:flex-row gap-6">

                {/* Middle Content */}
                <div className="flex-1 flex flex-col gap-6">
                    <ProfileMiddleContent />
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80 flex flex-col gap-6 flex-shrink-0">
                    <ProfileRightSidebar />
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
