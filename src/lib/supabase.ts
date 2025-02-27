import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

// Use environment variables or fallback to demo values for development
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "demo-key-for-development-only";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
