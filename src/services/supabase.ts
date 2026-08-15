import {createClient} from '@supabase/supabase-js';
const url=process.env.EXPO_PUBLIC_SUPABASE_URL;
const anon=process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
export const supabase=url&&anon?createClient(url,anon):null;
export function requireSupabase(){if(!supabase)throw new Error('Supabase is not configured. Copy .env.example and set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY.');return supabase;}
