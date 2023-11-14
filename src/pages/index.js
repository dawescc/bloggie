import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

import { useAuth } from '@/context/AuthContext';

import MadeWithLove from "@/components/madewithlove";
import TopCap from "@/components/TopCap";
import Profile from "@/components/profile";
import Feed from "@/components/feed";

import { ArticleForm } from "@/components/ArticleForm";
import { FloatingButton } from "@/components/FloatingButton";
import Footer from "@/components/Footer";

function Home() {
	const { session } = useAuth();
	const [isModalOpen, setModalOpen] = useState(false);
	const [replyTo, setReplyTo] = useState(null);

	const handleFloatingButtonClick = () => {
		setReplyTo(null);
		setModalOpen(true);
	  };

	const handleReplyClick = (articleId) => {
	  setReplyTo(articleId);
	  setModalOpen(true);
	};

	return (
		<div className='flex bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-white'>
			<div className='md:flex-grow h-full'></div>

			<div className='w-full md:w-10/12 lg:w-8/12 flex flex-col md:border-x border-zinc-200 dark:border-zinc-700'>
				
				<div id='topcap' className='h-auto border-b border-zinc-200 dark:border-zinc-700'>
					<TopCap session={session} />
				</div>

				<div id='main' className='flex flex-col'>
					{/*<Profile /> */}
					<Feed session={session} onReplyClick={handleReplyClick} />

					{session && 
						<div>
							<FloatingButton onOpen={() => setModalOpen(true)} />
							<ArticleForm isOpen={isModalOpen} onClose={() => setModalOpen(false)} replyTo={replyTo} session={session} />
						</div>
					}

				</div>

				<div
					id='botcap'
					className='h-auto'>
					<MadeWithLove />
				</div>

				<div id='Footer' className="h-auto border-t border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-800">
					<Footer />
				</div>
			</div>

			<div className='md:flex-grow h-full'></div>
		</div>
	);
}

export default Home;
