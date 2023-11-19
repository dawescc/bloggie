import { supabase } from '@/utils/supabaseClient';

export default async function handler(req, res) {

  if (req.method === 'POST') {
    
    try {
      const { email, password } = req.body;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return res.status(200).json({ response: data});
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}