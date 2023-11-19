// getTopics.js
import { supabase } from '@/utils/supabaseClient';

let cachedTopics = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes

export default async function handler(req, res) {
    const allowedOrigin = 'https://blog.dawes.cc';
    if (req.headers.origin !== allowedOrigin) {
        return res.status(403).json({ error: 'Access denied' });
    }

    const now = new Date();
    if (!cachedTopics || now - lastFetch > CACHE_DURATION) {
        try {
            const { data: topics, error } = await supabase.from('distinct_topics').select();

            if (error) {
                throw error;
            }

            cachedTopics = topics.map(t => t.topic);
            lastFetch = now;
        } catch (error) {
            console.error('Error fetching unique topics from Supabase:', error);
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(200).json(cachedTopics);
}
