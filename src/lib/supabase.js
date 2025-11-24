import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mock client if credentials are missing
const isMock = !supabaseUrl || !supabaseAnonKey;

export const supabase = isMock
    ? {
        from: () => ({
            select: () => ({ data: [], error: null }),
            insert: () => ({ data: [{ id: 'mock-id-' + Date.now() }], error: null }),
        }),
        auth: {
            getSession: () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
        }
    }
    : createClient(supabaseUrl, supabaseAnonKey);

export const isMockMode = isMock;
