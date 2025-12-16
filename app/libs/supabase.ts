import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
    console.error("Missing or invalid NEXT_PUBLIC_SUPABASE_URL. Make sure it is set in your .env file.");
}

if (!supabaseAnonKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Make sure it is set in your .env file.");
}

const finalUrl = (supabaseUrl && supabaseUrl.startsWith("http"))
    ? supabaseUrl
    : "https://placeholder.supabase.co";

const finalKey = supabaseAnonKey || "placeholder-key";

export const supabase = createClient(finalUrl, finalKey);
