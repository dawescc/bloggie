import { supabase } from "@/utils/supabaseClient";

let cachedArticles = {};
let lastFetchTime = {};
const CACHE_DURATION = 5 * 60 * 1000; // Cache duration in milliseconds, e.g., 5 minutes

export default async function handler(req, res) {
	const allowedOrigin = 'https://blog.dawes.cc';
	if (req.headers.origin !== allowedOrigin) {
	    return res.status(403).json({ error: 'Access denied' });
	}

	if (req.method !== "GET") {
		res.setHeader("Allow", ["GET"]);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}

	let { selectedTopic } = req.query;
	selectedTopic = selectedTopic || "*";

	const now = new Date().getTime();
	const cacheKey = selectedTopic;
	if (cachedArticles[cacheKey] && now - lastFetchTime[cacheKey] < CACHE_DURATION) {
		return res.status(200).json(cachedArticles[cacheKey]);
	}

	try {
		let query = supabase.from("articles").select("*").order("created_at", { ascending: false });

		if (selectedTopic === "misc") {
			query = query.or(`topic.is.null,topic.eq.,topic.eq.misc`);
		} else if (selectedTopic !== "all") {
			query = query.eq("topic", selectedTopic);
		}

		const { data: articles, error } = await query;

		if (error) {
			throw error;
		}

		cachedArticles[cacheKey] = articles;
		lastFetchTime[cacheKey] = now;

		return res.status(200).json(articles);
	} catch (error) {
		console.error("Error fetching data from Supabase:", error);
		return res.status(500).json({ error: error.message });
	}
}
