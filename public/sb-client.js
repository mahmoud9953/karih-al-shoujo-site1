// public/sb-client.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SB_URL = document.querySelector('meta[name="x-sb-url"]')?.content || "";
const SB_KEY = document.querySelector('meta[name="x-sb-key"]')?.content || "";

// Make one global instance and reuse it
if (!window.__supabase) {
  window.__supabase = createClient(SB_URL, SB_KEY, {
    auth: {
      persistSession: true,
      storageKey: "sb-kar", // your own key to avoid collisions
    },
  });
}

// optional: small helper
window.getSupabase = () => window.__supabase;
