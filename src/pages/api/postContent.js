import { supabase } from "@/utils/supabaseClient";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { content, topic = null, reply_to = null, image_url = null } = req.body;

		if (!content && !reply_to && !image_url) {
			return res.status(400).json({ error: "At least one of content, reply_to, or image_url must be provided" });
		}

		try {

			const { data, error } = await supabase.from("articles").insert([{ content, topic, reply_to, image_url }]);

			if (error) throw error;

			return res.status(200).json("all good :)");
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	} else {
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
