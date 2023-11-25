import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

import { useAuth } from '@/context/AuthContext';

import MadeWithLove from "@/components/madewithlove";
import TopCap from "@/components/TopCap";
import Profile from "@/components/profile";
import Feed from "@/components/feed";

import { Toaster, toast } from 'sonner'

import { FloatingButton } from "@/components/FloatingButton";
import Footer from "@/components/Footer";

function Home() {
	const { session } = useAuth();
	const [open, setOpen] = useState(false)
	const [replyTo, setReplyTo] = useState(null);

	const onReplyClick = (articleId) => {
	  setReplyTo(articleId);
	  setOpen(true);
	};

	return (
		<div vaul-drawer-wrapper="" className='flex bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-white h-full w-full'>
			<div className='md:flex-grow h-full'></div>

			<div className='w-full h-full md:w-3/4 lg:w-1/2 flex flex-col md:shadow-lg border-zinc-200 dark:border-zinc-700'>
				
				<Toaster position="top-right" richColors closeButton />

				<div id='topcap' className='h-auto border-b border-zinc-200 dark:border-zinc-700'>
					<TopCap session={session} />
				</div>

				<div id='main' className='flex flex-col'>
					<Profile />
					
					<Feed session={session} onReplyClick={onReplyClick} open={open} />

					{session && 
						<div>
							<FloatingButton open={open} setOpen={setOpen} replyTo={replyTo} session={session} setReplyTo={setReplyTo} />
						</div>
					}

				</div>

				<div
					id='botcap'
					className='h-auto'>
					<MadeWithLove />
				</div>

				<div id='Footer' className="h-auto border-t border-zinc-300 dark:border-zinc-700 bg-zinc-200 dark:bg-zinc-800">
					<Footer />
				</div>
			</div>

			<div className='md:flex-grow h-full'></div>
		</div>
	);
}

export default Home;
