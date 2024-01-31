"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { PostDrawer } from "./PostDrawer";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { MessageSquareQuote, Trash2 } from "lucide-react";

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
	}
	const handleDeleteClick = useCallback((id: string) => {
		deleteArticle(id);
	}, []);

	const renderArticle = useCallback(
		(article: Article) => {
			return (
				<div
					key={article.id}
					id={article.id}
					className='p-3 flex flex-col gap-4 rounded-xl shadow-sm card-bg last-of-type:mb-6'>
					<div className='flex items-center text-xs'>
						<div className='font-semibold'>{format(article.created_at, "MMM dd, yyyy")}</div>
						&nbsp;in&nbsp;
						<div
							className='cursor-pointer underline'
							onClick={() => handleTopicClick(article.topic)}>
							{article.topic}
						</div>
					</div>

					{article.image_url && (
						<div className='w-full h-auto max-w-md mx-auto rounded-lg overflow-hidden'>
							<img
								className='w-full object-cover rounded-lg'
								src={article.image_url}
								alt={"Post Image"}
							/>
						</div>
					)}

					<div className='text-2xl font-bold leading-7'>{article.content}</div>
					{article.reply_to && (
						<a
							href={`#${article.reply_to}`}
							className='text-xs font-mono py-1 flex flex-col gap-2 border-l-4 border-black dark:border-white px-2'>
							{article.reply_to_content}
							<span>{format(article.reply_to_created_at!, "MMM dd, yyyy")}</span>
						</a>
					)}
					{user && (
						<div className='dark:text-neutral-100 inline-flex gap-6 items-center justify-center py-2'>
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
				</div>
			);
		},
		[user]
	);

	return (
		<div className='w-full h-full flex flex-col gap-8'>
			<input
				type='text'
				className='sticky top-5 rounded-lg p-3 shadow-sm ring ring-inset ring-black/10 dark:ring-white/20 bg-white dark:bg-black'
				placeholder='Search Articles'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{selectedTopic && (
				<div className='flex gap-2'>
					<span className='animate-in-fst text-xs font-semibold inline-flex gap-2 items-center button button-bgs'>
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

			<div className='flex flex-col gap-8'>{filteredArticles.map(renderArticle)}</div>
		</div>
	);
}
