import { supabase } from '@/utils/supabaseClient';

let articleCache = {};
const CACHE_DURATION = 5 * 60 * 1000; // Cache for 5 minutes in milliseconds

export default async function handler(req, res) {
    const allowedOrigin = 'https://blog.dawes.cc';
    if (req.headers.origin !== allowedOrigin) {
        return res.status(403).json({ error: 'Access denied' });
    }

    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { articleId } = req.query;

    if (!articleId) {
        return res.status(400).json({ error: 'Article ID is required' });
    }

    const now = new Date().getTime();
    if (articleCache[articleId] && now - articleCache[articleId].timestamp < CACHE_DURATION) {
        return res.status(200).json(articleCache[articleId].data);
    }

    try {
        const { data: article, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', articleId)
            .single();

        if (error) {
            throw error;
        }

        // Update cache
        articleCache[articleId] = { data: article, timestamp: now };

        return res.status(200).json(article);
    } catch (error) {
        console.error('Error fetching article from Supabase:', error);
        return res.status(500).json({ error: error.message });
    }
}
