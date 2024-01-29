import Content from "@/components/Content";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";
import { PostDrawer } from "@/components/PostDrawer";

export default async function Index() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.error("Unable to load user from database", error);
	}
	return (
		<div className='w-full max-w-7xl mx-auto px-1 md:px-0 h-full flex flex-col items-center'>
			{data.user ? (
				<span className='inline-flex gap-10'>
					<PostDrawer />
					<AuthButton />
				</span>
			) : null}
			<Header />
			<Content />
		</div>
	);
}
