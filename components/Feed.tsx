"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { PostDrawer } from "./PostDrawer";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { MessageSquareQuote, Trash2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import getData from "@/actions/GetData";

interface Article {
	id: string;
	topic: string;
	created_at: Date;
	content?: string;
	image_url?: string;
	reply_to?: string;
	reply_to_topic?: string;
	reply_to_created_at?: Date;
	reply_to_content?: string;
	reply_to_image_url?: string;
}

interface FeedProps {
	data: Article[];
}

export default function Feed({ data }: FeedProps) {
	const [articles, setArticles] = useState<Article[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
	const [user, setUser] = useState<any>(null);
	const variants: Variants = {
		offscreen: {
			y: 10,
			x: -100,
			rotate: 0,
		},
		onscreen: {
			y: 0,
			x: 0,
			rotate: 0,
			transition: {
				type: "spring",
				bounce: 0.4,
				duration: 0.5,
			},
		},
	};

	useEffect(() => {
		if (Array.isArray(data)) {
			setArticles(data);
		}
	}, [data]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const supabase = createClient();
				const { data, error } = await supabase.auth.getUser();
				if (error) throw error;
				setUser(data);
			} catch (error) {
				console.error("Unable to load user from database", error);
			}
		};

		fetchUser();
	}, []);

	const filteredArticles = useMemo(() => {
		return articles.filter(
			(article) => (!selectedTopic || article.topic === selectedTopic) && article.content?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, articles, selectedTopic]);

	const handleTopicClick = useCallback((topic: string) => {
		setSelectedTopic(topic);
	}, []);

	function DeleteSuccessToast() {
		toast.success("post deleted!");
	}

	function DeleteFailToast() {
		toast.error("unable to delete post!");
	}

	async function deleteArticle(id: string) {
		// add confirmation
		try {
			const supabase = createClient();
			const { error } = await supabase.from("articles").delete().eq("id", id);
			if (error) throw error;
		} catch (error) {
			DeleteFailToast();
		}
		DeleteSuccessToast();
		const updatedArticles = await getData();
		if (Array.isArray(updatedArticles)) {
			setArticles(updatedArticles);
		} else {
			setArticles([]);
		}
	}

	const handleDeleteClick = useCallback((id: string) => {
		deleteArticle(id);
	}, []);

	const renderArticle = useCallback(
		(article: Article) => {
			return (
				<motion.div
					key={article.id}
					id={article.id}
					className='p-3 text-medium font-normal flex flex-col gap-4 card-bg last-of-type:mb-6 relative'
					variants={variants}
					initial='offscreen'
					whileInView='onscreen'
					viewport={{ once: true, amount: 0.1 }}>
					<div
						id='meta'
						className='flex flex-col mr-auto uppercase gap-2 text-xs font-light'>
						<div
							id='date'
							className=''>
							{format(article.created_at, "MMM dd, yyyy")}
						</div>
						<div
							id='topic'
							className='underline cursor-pointer'
							onClick={() => handleTopicClick(article.topic)}>
							{article.topic}
						</div>
					</div>

					{article.image_url && (
						<div
							id='image'
							className='w-full h-auto rounded-2xl overflow-hidden'>
							<img
								className='w-full object-cover'
								src={article.image_url}
								alt={"Post Image"}
							/>
						</div>
					)}

					<div
						id='content'
						className='font-medium leading-7'>
						{article.content}
					</div>

					{article.reply_to && (
						<a
							href={`#${article.reply_to}`}
							className='text-xs py-1 flex flex-col gap-2 border-l-4 border-neutral-900/20 dark:border-neutral-200/20 px-2'>
							{article.reply_to_content}
							<span>{format(article.reply_to_created_at!, "MMM dd, yyyy")}</span>
						</a>
					)}

					{user && (
						<div className='flex-1 flex ml-auto gap-6 items-center justify-center py-2'>
							<PostDrawer
								title='Reply'
								replyID={article.id}
								children={
									<button className='button w-full flex items-center justify-center button-bgs'>
										<MessageSquareQuote />
									</button>
								}
							/>
							<button
								className='button w-full flex items-center justify-center button-bgs'
								onClick={() => handleDeleteClick(article.id)}>
								<Trash2 />
							</button>
						</div>
					)}
				</motion.div>
			);
		},
		[user]
	);

	return (
		<div className='w-full h-full flex flex-col gap-4'>
			<div className='sticky top-0 z-[1] flex py-2 px-2 w-full search-bg-colors justify-center items-center'>
				<input
					type='text'
					className='w-full max-w-3xl p-3 shadow-sm ring ring-inset ring-black/10 dark:ring-white/20 bg-opacity-100 bg-neutral-100 dark:bg-neutral-800'
					placeholder='Search...'
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{selectedTopic && (
				<div className='flex gap-2'>
					<span className='animate-in-fst max-w-prose mx-auto text-xs font-semibold inline-flex gap-2 items-center button button-bgs'>
						{selectedTopic}
						<button onClick={() => setSelectedTopic(null)}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								height='16'
								width='12'
								viewBox='0 0 384 512'>
								<path d='M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z' />
							</svg>
						</button>
					</span>
				</div>
			)}

			<div className='flex flex-col max-w-prose mx-auto px-4 md:px-0 gap-6'>{filteredArticles.map(renderArticle)}</div>
		</div>
	);
}
