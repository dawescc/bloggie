"use server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function submitPost(formData: FormData) {
	const content = formData.get("content") as string;
	const topic = formData.get("topic") as string;

	let insertData: any = { content: content };

	if (topic && topic.trim() !== "") {
		insertData["topic"] = topic;
	}

	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data, error } = await supabase.from("articles").insert([insertData]);

	if (error) {
		throw error;
	} else {
		return redirect("/");
	}
}
