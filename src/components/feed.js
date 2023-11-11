import { useState, useEffect } from 'react';
import moment from 'moment';

const Feed = () => {
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
        return replyArticle ? replyArticle.content : null;
    };

    const filteredArticles = selectedTopic
        ? articles.filter(article => article.topic === selectedTopic || (!article.topic && selectedTopic === 'misc'))
        : articles;

        return (
            <div className="flex flex-col">
                    {/* Topics Section */}
                    <div className="pb-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center sticky top-0">
                        <div className="h-full w-full px-2 pt-1">
                            <p className="text-sm opacity-50">Topics:</p>
                            <div className="flex flex-wrap gap-2 mt-2 text-black">
                                <span
                                    className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer select-none hover:bg-pink-300 hover:text-black ${
                                        selectedTopic === null ? 'bg-pink-200 text-black' : 'bg-gray-100 dark:bg-gray-600 dark:text-white'
                                    }`}
                                    onClick={() => setSelectedTopic(null)}>
                                    All
                                </span>
                                {topics.map((topic, index) => (
                                    <span
                                        key={index}
                                        className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded cursor-pointer select-none hover:bg-pink-300 hover:text-black ${
                                            selectedTopic === topic ? 'bg-pink-200 text-black' : 'bg-gray-100 dark:bg-gray-600 dark:text-white'
                                        }`}
                                        onClick={() => setSelectedTopic(topic)}>
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
        
                    {/* Feed Section */}
                    <div className="pt-2">
                        <ul className="w-full h-full">
                            {filteredArticles.map((article) => (
                                <li key={article.id} className="py-4 px-2 flex flex-col gap-1 border-b border-slate-200 dark:border-slate-800">
                                    <div className='flex gap-1 text-xs items-center'>
                                        <div className="rounded-md overflow-hidden border-2 border-slate-200 dark:border-slate-800">
                                            <img id="pfp" className="h-8 w-8" src="https://neutgwolrftsfsvfhutp.supabase.co/storage/v1/object/sign/img/pfp/0.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWcvcGZwLzAucG5nIiwiaWF0IjoxNjk5Mzc2MDEyLCJleHAiOjE3NjI0NDgwMTJ9.8t98N7iwrFoqfs3z5wJskH2fnoLiCF2XWFzerRh8KVo&t=2023-11-07T16%3A53%3A32.454Z"/>
                                        </div>
                                        <div className='flex gap-1 flex-col'>
                                            <span className='font-semibold'>ryan</span>
                                            <span className='text-pink-300'>@ryandawes</span>
                                        </div>
                                    </div>
                                    
                                    {/* Article content here */}
                                    <span className="py-2 px-2 gap-1 flex flex-col">
                                        
                                        <span className=''>{article.content}</span>

                                        {/* Article Reply Content */}
                                        {article.reply_to && (
                                            <span className="text-slate-400 text-xs p-2 rounded-md border border-slate-200 dark:border-slate-800 flex gap-2 items-center">
                                                <i className="fa-solid fa-reply"></i> {findReplyContent(article.reply_to)}
                                            </span>
                                        )}
                                    </span>



                                    {/* Custom Date Format */}
                                    <span className="px-2 text-xs text-gray-600">
                                        {moment(article.created_at).format('YYYY-MM-DD hh:mm:ss A ')} 
                                        ({moment(article.created_at).fromNow()})
                                    </span>

                                    {/* Optional: Display topic if it exists */}
                                    {article.topic && (
                                        <span className="item-tag text-xs text-gray-600 px-2">
                                            #{article.topic}
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

