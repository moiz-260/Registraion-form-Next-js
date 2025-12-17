"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/libs/supabase";
import Link from "next/link";
import "@/components/LandingPage/LandingPage.css"; // Reuse semantic styles

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                // 1. Get Auth User
                const { data: { user } } = await supabase.auth.getUser();
                console.log("Supabase User:", user); // Debug log
                if (!user) {
                    router.push("/SignIn");
                    return;
                }
                setUser(user);

                // 2. Fetch Profile from user_profiles table
                const { data: profileData, error } = await supabase
                    .from("user_profiles")
                    .select("*")
                    .eq("id", user.id)
                    .maybeSingle(); // Use maybeSingle to avoid error if row doesn't exist

                if (error) {
                    console.error("Error fetching profile (details):", JSON.stringify(error, null, 2));
                    console.error("User ID being queried:", user.id);
                } else if (!profileData) {
                    console.warn("No profile row found for user. Accessing legacy metadata or new user?");
                } else {
                    console.log("Fetched Profile:", profileData);
                    setProfile(profileData);
                    console.log("Profile of User is:", profile);
                }

            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="landing-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', color: 'var(--slate-600)' }}>Loading profile...</div>
            </div>
        );
    }

    if (!user) return null;

    // Use profile data if available, fallback to placeholders
    const name = user.user_metadata?.full_name || "User";

    return (
        <div className="landing-container">
            {/* Background decoration */}
            <div className="bg-decoration">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <nav className="landing-nav">
                <Link href="/" className="nav-logo" style={{ textDecoration: 'none' }}>
                    NextApp
                </Link>
                <button className="btn-nav-signin" onClick={handleSignOut}>
                    Sign Out
                </button>
            </nav>

            <main className="landing-hero" style={{ minHeight: 'calc(100vh - 80px)', padding: '2rem 1rem' }}>
                <div className="hero-content" style={{ width: '100%', maxWidth: '600px' }}>
                    <div className="hero-glow"></div>

                    <h1 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Welcome, <span>{name}</span>
                    </h1>

                    <div className="feature-card" style={{
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '2rem',
                        background: 'rgba(255, 255, 255, 0.8)',
                        width: '100%',
                        margin: '2rem 0',
                        gap: '1.5rem',
                        animation: 'fadeIn 0.5s ease-out'
                    }}>
                        <div style={{ width: '100%', borderBottom: '1px solid var(--slate-200)', paddingBottom: '1rem', marginBottom: '0.5rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--slate-700)' }}>Profile Details</h2>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.5rem 1rem', width: '100%', alignItems: 'center' }}>
                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Full Name:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.full_name || name}</span>

                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Email:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.email}</span>

                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Phone:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.phone || "N/A"}</span>


                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Gender:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.gender || "N/A"}</span>

                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Date of Birth:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.date_of_birth || "N/A"}</span>

                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Address:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.address || "N/A"}</span>

                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>City:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.city || "N/A"}</span>

                            <span style={{ fontWeight: 600, color: 'var(--slate-600)' }}>Country:</span>
                            <span style={{ color: 'var(--slate-900)' }}>{user?.user_metadata?.country || "N/A"}</span>
                        </div>
                    </div>

                    <p className="hero-description" style={{ fontSize: '1rem' }}>
                        You are securely logged in. This dashboard displays the information fetched from your private profile.
                    </p>
                </div>
            </main>
        </div>
    );
}
