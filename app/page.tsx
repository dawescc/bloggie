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
				<div className='inline-flex gap-10 pt-2 text-xs font-bold'>
					<span className='bg-neutral-600/20 rounded-md dark:text-neutral-100 inline-flex items-center justify-center px-2 *:w-full'>
						<PostDrawer title='New Post' />
					</span>
					<span className='bg-neutral-600/20 rounded-md dark:text-neutral-100 inline-flex items-center justify-center *:w-full'>
						<AuthButton />
					</span>
				</div>
			) : null}
			<Header />
			<Content />
		</div>
	);
}
