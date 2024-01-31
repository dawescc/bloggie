import Content from "@/components/Content";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";
import { PostDrawer } from "@/components/PostDrawer";
import { MessageSquarePlus, LogOut } from "lucide-react";

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
				<div className='py-2 px-4 mb-4 rounded-full w-full text-xs font-bold fixed bottom-0 shadow-sm max-w-sm ring-2 ring-inset bar-colors'>
					<div className='w-full flex flex-wrap gap-6 justify-evenly'>
						<PostDrawer
							title={`New`}
							children={
								<span className='button button-bgs'>
									<span className='inline-flex items-center gap-2 justify-center'>
										New
										<MessageSquarePlus />
									</span>
								</span>
							}
						/>
						<AuthButton
							children={
								<button className='button button-bgs'>
									<span className='inline-flex items-center gap-2 justify-center'>
										Logout
										<LogOut />
									</span>
								</button>
							}
						/>
					</div>
				</div>
			) : null}
			<Header />
			<Content />
		</div>
	);
}
