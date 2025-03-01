import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Use environment variables or fallback to demo values for development
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://qxwntoymmgmngtulelij.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4d250b3ltbWdtbmd0dWxlbGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3NDcwOTQsImV4cCI6MjA1NjMyMzA5NH0.PCAGyVWWCXJbQjClF4RAXSoSotkouKoys_GRxfBY6wg";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
