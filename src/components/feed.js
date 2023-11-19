import { useState, useEffect } from "react";
import TopicSelector from "./TopicSelector";
import ArticleList from "./ArticleList";


const Feed = ({ session, onReplyClick }) => {
	const [selectedTopic, setSelectedTopic] = useState('pinned');

	return (
		<div id='feed' className='flex flex-col'>
			
			{/* Topics Section */}
			<TopicSelector selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} />

			{/* Article List Section */}
			<ArticleList selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} session={session} onReplyClick={onReplyClick} />
		
		</div>
	);
};

export default Feed;
