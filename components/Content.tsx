import Feed from "@/components/Feed";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

async function getData() {
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

export default async function Content() {
	const articles = await getData();
	return (
		<div className='w-full flex h-full items-center overflow-hidden'>
			<div className='w-full h-full overflow-auto bg-neutral-50 dark:bg-neutral-900 rounded-t-xl p-2 pt-4'>
				<Feed data={articles} />
			</div>
		</div>
	);
}
