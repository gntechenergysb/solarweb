import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type User = {
  id: string;
  email: string;
  username?: string;
  tier: "free" | "paid";
  listingsCount: number;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    username: string,
  ) => Promise<{ error: any; user: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (data: Partial<User>) => Promise<{ error: any }>;
  upgradeToPaid: () => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active session on mount
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        // Fetch user profile from profiles table
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        if (!error && profileData) {
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
            username: profileData.username,
            tier: profileData.tier || "free",
            listingsCount: profileData.listings_count || 0,
            createdAt: profileData.created_at,
          });
        }
      }

      setLoading(false);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          // Fetch user profile
          const { data: profileData, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (!error && profileData) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              username: profileData.username,
              tier: profileData.tier || "free",
              listingsCount: profileData.listings_count || 0,
              createdAt: profileData.created_at,
            });
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (!error && data.user) {
      // Create a profile record
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          username,
          tier: "free",
          listings_count: 0,
          created_at: new Date().toISOString(),
        },
      ]);

      if (profileError) {
        return { error: profileError, user: null };
      }
    }

    return { error, user: data.user };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("profiles")
      .update({
        username: data.username,
        // Add other fields as needed
      })
      .eq("id", user.id);

    if (!error && data.username) {
      setUser({ ...user, ...data });
    }

    return { error };
  };

  const upgradeToPaid = async () => {
    if (!user) return { error: new Error("Not authenticated") };

    // In a real app, this would connect to a payment processor
    // For now, we'll just update the tier in the database
    const { error } = await supabase
      .from("profiles")
      .update({ tier: "paid" })
      .eq("id", user.id);

    if (!error) {
      setUser({ ...user, tier: "paid" });
    }

    return { error };
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    upgradeToPaid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
