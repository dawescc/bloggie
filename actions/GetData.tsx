"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function getData() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	try {
		let { data: articles, error } = await supabase.from("articles_dev_replies").select("*").order("id", { ascending: false });
		if (error) throw error;
		return articles;
	} catch (error) {
		console.error("Unable to load articles from database", error);
	}
}
