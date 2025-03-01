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
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session fetch error:", error);
        return;
      }

      if (data.session?.user) {
        // Fetch user profile from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();

        if (!profileError && profileData) {
          // User profile exists, set user state
          setUser({
            id: data.session.user.id,
            email: data.session.user.email || "",
            username: profileData.username,
            tier: profileData.tier || "free",
            listingsCount: profileData.listings_count || 0,
            createdAt: profileData.created_at,
          });
        } else {
          console.warn("Profile not found, inserting into database...");
          
          // Retrieve username from localStorage
          const storedUsername = localStorage.getItem("pendingUsername") || "User";

          // Insert new profile for confirmed user
          const { error: insertError } = await supabase.from("profiles").insert([
            {
              id: data.session.user.id,
              username: storedUsername, // ✅ Use stored username instead of email prefix
              tier: "free",
              listings_count: 0,
              created_at: new Date().toISOString(),
            },
          ]);

          if (insertError) {
            console.error("Profile insert error:", insertError);
          } else {
            // Fetch and set the newly created profile
            const { data: newProfile } = await supabase
              .from("profiles")
              .select("*")
              .eq("id", data.session.user.id)
              .single();
  
            if (newProfile) {
              setUser({
                id: newProfile.id,
                email: data.session.user.email || "",
                username: newProfile.username,
                tier: newProfile.tier || "free",
                listingsCount: newProfile.listings_count || 0,
                createdAt: newProfile.created_at,
              });

              // Clear pending username from localStorage
              localStorage.removeItem("pendingUsername");
            }
          }

        }
      }

      setLoading(false);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          checkUser(); // Force refresh user state after sign-in
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);


  const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", error);
    return { error };
  }

  // ✅ Explicitly refresh session after login
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
  const { data: refreshedSession, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Session refresh error:", sessionError);
  }
  
  return { error: null };
};





  const signUp = async (email: string, password: string, username: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password});
  
    if (error) return { error, user: null }; 
  
    if (!data?.user) {
      return { error: new Error("User registration failed!"), user: null };
    }
     
    // Store the username in localStorage to be used after confirmation
    localStorage.setItem("pendingUsername", username);

    // Tell the user to confirm their email
    alert("Please check your email to confirm your account before logging in.");

    return { error: null, user: data.user };
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
     
    // Simulate payment processing
    alert("Payment successful! Your account has been upgraded.");

    // In a real app, this would connect to a payment processor
    // For now, we'll just update the tier in the database
    const { error } = await supabase
      .from("profiles")
      .update({ tier: "paid" })
      .eq("id", user.id);
    
    if (error) return { error };

    // Update user state locally
    setUser({ ...user, tier: "paid" });

    return { error: null };
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
