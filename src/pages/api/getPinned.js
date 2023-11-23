import { supabase } from '@/utils/supabaseClient';

export default async function handler(req, res) {
    try {
        const { data: pinnedArticles, error } = await supabase
            .from('pinned_articles')
            .select()
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        return res.status(200).json(pinnedArticles);
    } catch (error) {
        console.error('Error fetching pinned articles from Supabase:', error);
        return res.status(500).json({ error: error.message });
    }
}
