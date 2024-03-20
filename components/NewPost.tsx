import { submitPost } from "@/actions/Submit";
import { createClient } from "@/utils/supabase/server";
import { Forward, ImagePlus, Tag } from "lucide-react";
import { cookies } from "next/headers";

export default async function NewPost() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	let { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		return;
	} else {
		return (
			<form
				action={submitPost}
				className='new-post'>
				<input
					type='text'
					placeholder='Write something new...'
					name='content'
					id='content'
					className=''
				/>
				<div className='flex gap-2 px-1'>
					<div className='add-button'>
						<Tag size={20} />
					</div>
					<div className='add-button'>
						<ImagePlus size={20} />
					</div>
					<button className='submit'>
						<Forward size={20} />
					</button>
				</div>
			</form>
		);
	}
}
