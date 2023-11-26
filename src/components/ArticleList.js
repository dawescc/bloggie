import React, { useState, useEffect } from "react";
import moment from "moment";
import Loader from "./Loader";

import { AdminMenu } from "./AdminMenu";

const ArticleList = ({ selectedTopic, setSelectedTopic, session, onReplyClick }) => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// fetch individual article replies
	const fetchReply = async (replyToId) => {
		try {
			const response = await fetch(`/api/getArticleByID?articleId=${replyToId}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (e) {
			console.error("Error fetching reply:", e);
			return null; // Returning null in case of an error
		}
	};

	// fetch articles with their replies
	const fetchArticles = async () => {
		try {
			setLoading(true);
			let url = null;
			if (selectedTopic == "pinned") {
				url = `/api/getPinned`;
			} else {
				url = `/api/getContent?selectedTopic=${encodeURIComponent(selectedTopic || "all")}`;
			}
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			const articlesWithReplies = await Promise.all(
				data.map(async (article) => {
					if (!article.reply_to) return article;
					const replyContent = await fetchReply(article.reply_to);
					return { ...article, replyContent };
				})
			);
			setArticles(articlesWithReplies);
		} catch (e) {
			setError(e.message);
			console.error("Error fetching articles:", e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, [selectedTopic]);

	if (loading) {
		return (
			<span className='flex p-2 text-xs items-center justify-center content-center'>
				<Loader />
			</span>
		);
	}

	if (error) {
		return <p>Error loading articles: {error}</p>;
	}

	const PinnedBadge = ({ onClick }) => {
		return (
			<span className='mr-auto text-xs mt-2'>
				<div
					onClick={() => onClick}
					className='cursor-pointer hover:underline items-center content-center justify-center flex gap-1'>
					<i className='fa-solid fa-star'></i>
					<span className=''>Featured</span>
				</div>
			</span>
		);
	};

	const ReplyContent = ({ onClick, article }) => {
		return (
<span className='text-zinc-400 text-xs py-2 px-3 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 flex flex-col gap-2'>
									<span className='flex flex-col gap-2'>
										{article.replyContent.pinned && (
											<span className='mr-auto text-[0.75rem]/[1rem] text-zinc-500 dark:text-zinc-500 pt-1'>
												<span
													onClick={() => setSelectedTopic("pinned")}
													className='cursor-pointer flex justify-center items-center content-center py-[0.125rem] gap-1 px-1 border border-zinc-200 dark:border-zinc-700 rounded-md'>
													<i className='fa-solid fa-star '></i>
													<span>featured</span>
												</span>
											</span>
										)}
							<span className='font-semibold'>{article.replyContent.content}</span>
							{article.replyContent.image_url && (
							<div className='rounded-lg overflow-hidden w-full h-auto transition-all duration-700 ease-in-out border border-zinc-200 dark:border-zinc-700'>
								<img
									className='object-cover w-full h-auto'
									src={article.replyContent.image_url}
								/>
							</div>
						)}
					</span>
				<span className='text-[0.55rem]'>{moment(article.replyContent.created_at).fromNow()}</span>
			</span>
		);
	}

	return (
		<div
			id='articles'
			className='pt-2'>
			<ul className='w-full h-full flex flex-col gap-8 px-2'>
				{articles.map((article) => (
					<li
						key={article.id}
						id={article.id}
						className={`pt-8 pb-4 px-4 relative rounded-xl border border-zinc-300 dark:border-zinc-700`}>
						<div className='flex flex-col gap-4 w-full'>
							{/* Article content */}
							<span className={`py-2 gap-4 flex flex-col ${session ? "pr-4" : ""} break-words hyphens-auto`}>
								<span className='text-[0.85rem]/[1.75rem] font-medium'>{article.content}</span>
								{article.image_url && (
									<div className='rounded-lg overflow-hidden w-full h-auto transition-all duration-700 ease-in-out border-zinc-200 dark:border-zinc-700 border'>
										<img
											className='object-cover w-full h-auto'
											src={article.image_url}
										/>
									</div>
								)}
							</span>

							{/* Article Reply Content */}
							{article.replyContent && (
								<ReplyContent onClick={() => setSelectedTopic("pinned")} article={article} />
							)}

							{/* Custom Date Format & Display topic */}
							<div className='flex items-center align-middle text-xs text-zinc-500 dark:text-zinc-500'>
								<span className=''>
									{moment(article.created_at).format("YYYY-MM-DD hh:mm:ss A ")}({moment(article.created_at).fromNow()})
								</span>
								{article.topic && (
									<span
										onClick={() => setSelectedTopic(article.topic)}
										className='pl-2 cursor-pointer hover:underline'>
										#{article.topic}
									</span>
								)}
							</div>

							{/* If pinned, show badge */}
							{article.pinned && (
								<PinnedBadge onClick={() => setSelectedTopic("pinned")} />
							)}

							{/* If session, show admin button */}
							{session && (
								<AdminMenu
									onReplyClick={onReplyClick}
									ArticleID={article.id}
									bool={article.pinned ? "false" : "true"}
								/>
							)}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ArticleList;
