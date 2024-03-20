import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
	const signIn = async (formData: FormData) => {
		"use server";

		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}

		return redirect("/");
	};

	const signUp = async (formData: FormData) => {
		"use server";

		const origin = headers().get("origin");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			return redirect("/login?message=Could not authenticate user");
		}

		return redirect("/login?message=Check email to continue sign in process");
	};

	return (
		<form
			className='flex-1 flex flex-col justify-center gap-2 pt-20 px-8 text-base'
			action={signIn}>
			<label
				className='text-md'
				htmlFor='email'>
				Email
			</label>
			<input
				className='sign-in'
				name='email'
				placeholder='you@example.com'
				required
			/>
			<label
				className='text-md'
				htmlFor='password'>
				Password
			</label>
			<input
				className='sign-in'
				type='password'
				name='password'
				placeholder='••••••••'
				required
			/>
			<button className='sign-in'>Sign In</button>
			{searchParams?.message && <p className='mt-4 p-4 text-center text-red-400'>{searchParams.message}</p>}
		</form>
	);
}
