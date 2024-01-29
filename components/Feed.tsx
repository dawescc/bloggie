"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { format } from "date-fns";
import { PostDrawer } from "./PostDrawer";
import { createClient } from "@/utils/supabase/client";

interface Article {
	id: string;
	created_at: Date;
	content: string;
	reply_to?: string;
	reply_to_content?: string;
	reply_to_topic?: string;
	reply_to_created_at?: Date;
	topic: string;
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
			(article) => (!selectedTopic || article.topic === selectedTopic) && article.content.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, articles, selectedTopic]);

	const handleTopicClick = useCallback((topic: string) => {
		setSelectedTopic(topic);
	}, []);

	const renderArticle = useCallback(
		(article: Article) => {
			return (
				<div
					key={article.id}
					className='p-3 flex flex-col gap-4 rounded-md no-underline bg-neutral-200/30 dark:bg-neutral-700/30 last-of-type:mb-6'>
					<span className='text-xs font-semibold text-foreground/40'>{format(article.created_at, "MMM dd, yyyy")}</span>
					<span className='text-lg font-bold leading-7'>{article.content}</span>
					{article.reply_to && (
						<span className='text-sm font-light py-1 my-2 text-foreground/40 border-l-4 border-neutral-900/20 dark:border-neutral-100/20 pl-4 flex flex-col gap-2'>
							{article.reply_to_content}
							<span className='text-xs'>{format(article.reply_to_created_at!, "MMM dd, yyyy")}</span>
						</span>
					)}
					<span
						className='animate-in text-xs mr-auto py-2 text-foreground/50 underline'
						onClick={() => handleTopicClick(article.topic)}>
						{article.topic}
					</span>
					{user && (
						<PostDrawer
							title='reply'
							replyID={article.id}
						/>
					)}
				</div>
			);
		},
		[user]
	);

	return (
		<div className='w-full h-full overflow-hidden flex flex-col gap-8'>
			<input
				type='text'
				className='rounded-lg p-2 border border-foreground/10 hover:border-foreground/20 transition-all bg-background text-foreground'
				placeholder='Search...'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			{selectedTopic && (
				<div className='flex gap-2'>
					<span className='animate-in-fst text-xs font-semibold inline-flex gap-2 items-center py-1 px-2 rounded-md bg-foreground/5 dark:bg-foreground/20 border border-foreground/10'>
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

			<div className='flex flex-col overflow-auto gap-6'>{filteredArticles.map(renderArticle)}</div>
		</div>
	);
}
