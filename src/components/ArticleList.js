import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Loader from './Loader';

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
            console.error('Error fetching reply:', e);
            return null; // Returning null in case of an error
        }
    };

    // fetch articles with their replies
    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/getContent?selectedTopic=${encodeURIComponent(selectedTopic || 'all')}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const articlesWithReplies = await Promise.all(data.map(async (article) => {
                if (!article.reply_to) return article;
                const replyContent = await fetchReply(article.reply_to);
                return { ...article, replyContent };
            }));
            setArticles(articlesWithReplies);
        } catch (e) {
            setError(e.message);
            console.error('Error fetching articles:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [selectedTopic]);

    if (loading) {
        return (
            <span className='flex p-2 text-xs items-center justify-center content-center'><Loader /></span>
        );
    }

    if (error) {
        return <p>Error loading articles: {error}</p>;
    }

    return (
        <div id='articles' className='pt-2'>
            <ul className='w-full h-full'>
                {articles.map((article) => (
                    <li key={article.id} id={article.id}
                        className='py-8 px-4 flex flex-col gap-4 border-b border-zinc-300 dark:border-zinc-700'>
                        {/* Article content */}
                        <span className='p-2 gap-4 flex flex-col'>
                            <span className='text-[0.9rem]/[1.2rem] font-medium'>{article.content}</span>
                            {article.image_url && (
                                <div className='rounded-lg overflow-hidden w-full h-auto transition-all duration-700 ease-in-out border-zinc-200 dark:border-zinc-700 border'>
                                    <img className='object-cover w-full h-auto' src={article.image_url} />
                                </div>
                            )}
                        </span>
                        {/* Article Reply Content */}
                        {article.replyContent && (
                            <span className='text-zinc-400 text-xs py-2 px-3 mx-2 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 flex flex-col gap-1'>
                                <span className='flex flex-col gap-1'>
                                    <span className='font-semibold'>{article.replyContent.content}</span>
                                    {article.replyContent.image_url && (
                                        <div className='rounded-lg overflow-hidden w-full h-auto transition-all duration-700 ease-in-out border border-zinc-200 dark:border-zinc-700'>
                                            <img className='object-cover w-full h-auto' src={article.replyContent.image_url} />
                                        </div>
                                    )}
                                </span>
                                <span className='text-[0.55rem]'>{moment(article.replyContent.created_at).fromNow()}</span>
                            </span>
                        )}
                        {/* Custom Date Format & Display topic */}
                        <span className='flex items-center align-middle text-xs text-zinc-500 dark:text-zinc-500'>
                            <span className='pl-2'>
                                {moment(article.created_at).format("YYYY-MM-DD hh:mm:ss A ")}({moment(article.created_at).fromNow()})
                            </span>
                            {article.topic && (
                                <span onClick={() => setSelectedTopic(article.topic)} className='pl-2 cursor-pointer hover:underline'>
                                    #{article.topic}
                                </span>
                            )}
                        </span>

                        {/* If session, show reply button */}
                        {session && (
                            <span className='mt-2 px-2 text-sm ml-2 mr-auto text-zinc-700 dark:text-zinc-300 cursor-pointer rounded-lg shadow-sm border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 hover:bg-opacity-50'>
                                <span
                                    className=''
                                    onClick={() => onReplyClick(article.id)}>
                                    <i className='fa-solid fa-reply'></i>
                                </span>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;
