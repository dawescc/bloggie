import { supabase } from '@/utils/supabaseClient';

export const logout = async () => {
    await supabase.auth.signOut();
};