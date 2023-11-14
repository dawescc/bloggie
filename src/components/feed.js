import { useState, useEffect } from 'react';
import moment from 'moment';

const Feed = ({session, onReplyClick}) => {
    const [articles, setArticles] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null);
    

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('/api/getContent');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Set articles
                setArticles(data);

                // Extract unique topics from articles
                const extractedTopics = new Set(['misc']); // Include 'misc' by default
                data.forEach(article => {
                    extractedTopics.add(article.topic || 'misc');
                });

                setTopics(Array.from(extractedTopics));
            } catch (error) {
                console.error("Fetch error:", error.message);
            }
        };

        fetchArticles();
    }, []);

    const findReplyContent = (replyToId) => {
        const replyArticle = articles.find(article => article.id === replyToId);
        return replyArticle ? replyArticle : null;
    };

    const filteredArticles = selectedTopic
        ? articles.filter(article => article.topic === selectedTopic || (!article.topic && selectedTopic === 'misc'))
        : articles;

        return (
			<div className='flex flex-col'>
				{/* Topics Section border-zinc-300 dark:border-zinc-700 */}
				<div className='p-4 pt-2 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 flex items-center sticky top-0'>
					<div className='h-full w-full'>
						<p className='text-sm opacity-50'>Topics:</p>
						<div className='flex flex-wrap gap-2 mt-2 text-black'>
								<span
									className={`text-xs font-semibold mr-2 px-3 py-1 rounded-full cursor-pointer select-none hover:bg-pink-300 hover:text-black ${
										selectedTopic === null ? "bg-pink-200 text-black" : "bg-zinc-200 dark:bg-zinc-600 dark:text-white"
									}`}
									onClick={() => setSelectedTopic(null)}>
									all
								</span>
							{topics.map((topic, index) => (
								<span
									key={index}
									className={`text-xs font-semibold mr-2 px-3 py-1 rounded-full cursor-pointer select-none hover:bg-pink-300 hover:text-black ${
										selectedTopic === topic ? "bg-pink-200 text-black" : "bg-zinc-200 dark:bg-zinc-600 dark:text-white"
									}`}
									onClick={() => setSelectedTopic(topic)}>
									{topic}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* Feed Section */}
				<div className='pt-2'>
					<ul className='w-full h-full'>
						{filteredArticles.map((article) => (
							<li key={article.id} id={article.id}
								className='py-8 px-4 flex flex-col gap-4 border-b border-zinc-300 dark:border-zinc-700'>
								{/* Article content here */}
								<span className='p-2 gap-4 flex flex-col'>
								
								<span className='text-[0.9rem]/[1.2rem] font-medium'>{article.content}</span>
									
									{/* Article IMG if exists */}
									{article.image_url && (
										<div
											className='rounded-lg overflow-hidden w-full h-auto
                                                        transition-all duration-700 ease-in-out'>
											<img className='object-cover w-full h-auto' src={article.image_url} />
										</div>
									)}
								</span>

								{/* Article Reply Content */}
								{article.reply_to && (
									<span className='text-zinc-400 text-xs py-2 px-3 mx-2 rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 flex flex-col gap-1'>
										<span className='flex flex-col gap-1'>
											<span className='font-semibold'>{findReplyContent(article.reply_to).content}</span>
											{findReplyContent(article.reply_to).image_url && (
												<div className='rounded-lg overflow-hidden w-full h-auto
														transition-all duration-700 ease-in-out'>
													<img className='object-cover w-full h-auto' src={findReplyContent(article.reply_to).image_url} />
												</div>
											)}
										</span>
										<span className='text-[0.55rem]'>{moment(findReplyContent(article.reply_to).created_at).fromNow()}</span>
									</span>
								)}

								{/* Custom Date Format & Display topic */}
                                <span className='flex items-center align-middle text-xs text-zinc-500 dark:text-zinc-500'>
                                    <span className='pl-2'>
                                        {moment(article.created_at).format("YYYY-MM-DD hh:mm:ss A ")}({moment(article.created_at).fromNow()})
                                    </span>

                                    {article.topic && <span onClick={() => setSelectedTopic(article.topic)} className='pl-2 cursor-pointer hover:underline'>#{article.topic}</span>}
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
			</div>
		);
};

export default Feed;

