import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { toast } from "sonner";

export default async function AuthButton({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const signOut = async () => {
		"use server";

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		await supabase.auth.signOut();
		LogOutToast();
	};

	return user ? <form action={signOut}>{children}</form> : null;
}

function LogOutToast() {
	toast.success("Logged out!");
}
