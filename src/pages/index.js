import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

import { useAuth } from '@/context/AuthContext';

import MadeWithLove from "@/components/madewithlove";
import TopCap from "@/components/TopCap";
import Profile from "@/components/profile";
import Feed from "@/components/feed";

import { ArticleForm } from "@/components/ArticleForm";
import { FloatingButton } from "@/components/FloatingButton";

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
		<div className='flex'>
			<div className='md:flex-grow h-full'></div>

			<div className='w-full md:w-10/12 lg:w-8/12 flex flex-col md:border-x border-gray-300 dark:border-gray-700'>
				<div id='topcap' className='h-auto border-b border-gray-300 dark:border-gray-700'>
					<TopCap session={session} />
				</div>
				<div id='main' className='flex flex-col'>
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
					className='h-auto border-t border-gray-300 dark:border-gray-700'>
					<MadeWithLove session={session} />
				</div>
			</div>

			<div className='md:flex-grow h-full'></div>
		</div>
	);
}

export default Home;
