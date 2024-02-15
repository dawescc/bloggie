import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import MenuBar from "@/components/MenuBar";
import Content from "@/components/Content";
import Footer from "@/components/Footer";

export default async function Index() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const { data, error } = await supabase.auth.getUser();
	if (error) {
		console.error("Unable to load user from database", error);
	}

	return (
		<div className='w-full max-w-7xl mx-auto h-full flex flex-col items-center'>
			{data.user ? <MenuBar /> : null}
			<Header />
			<Content />
			<Footer />
		</div>
	);
}
