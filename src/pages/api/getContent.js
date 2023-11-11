import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let { data: articles, error } = await supabase
            .from('articles')
            .select('*')
            .order('created_at', { ascending: false }); // Sort by 'created_at' in descending order

        if (error) {
            console.error('Error fetching data from Supabase:', error);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json(articles);
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
