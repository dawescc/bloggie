import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const TopicSelector = ({ selectedTopic, setSelectedTopic }) => {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const scrollToTop = () => {
		window.scrollTo({
		  top: 0,
		  behavior: 'smooth',
		});
	};

	// Fetch topics from the API
	useEffect(() => {
		const fetchTopics = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/getTopics");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setTopics(data);
			} catch (error) {
				setError(error.message);
				console.error("Error fetching topics:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTopics();
	}, []);

	// scroll effect for UI
	useEffect(() => {
		const handleScroll = () => {
			const element = document.getElementById("topicsTop");
			const topPosition = element.parentElement.getBoundingClientRect().top;

			const openClasses = ["max-h-10", "opacity-100"];
			const closedClasses = ["max-h-0", "opacity-0"];

			const largeScreenThreshold = 10;
			const smallScreenThreshold = 24.0;
			
			const threshold = window.innerWidth > 640 ? largeScreenThreshold : smallScreenThreshold;
			
			if (Math.abs(topPosition) < threshold) {
				element.classList.remove(...closedClasses);
				element.classList.add(...openClasses);
			} else {
				element.classList.remove(...openClasses);
				element.classList.add(...closedClasses);
			}
			
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

    if (loading) {
        return (
            <span className='flex p-2 text-xs items-center justify-center content-center'><Loader /></span>
        );
    }

	if (error) {
		return <p>Error fetching topics: {error}</p>;
	}

	return (
		<div
			id='topics'
			className='p-4 pt-2 border-b border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 flex items-center sticky top-0'>
			<div className='h-full w-full'>
				<div id='topicsTop' className='overflow-hidden transition-all ease-in-out duration-[575ms] max-h-0 opacity-0'>
					<span className='pb-2 pt-1 w-full h-full flex items-center'>
						<a href="/" className='font-semibold hover:underline cursor-pointer'>ryan</a>
						<span className='flex-grow'></span>
						<span className=''>
							<span
								onClick={scrollToTop}
								className='cursor-pointer'>
								<i className='fa-solid fa-arrow-up'></i>
							</span>
						</span>
					</span>
				</div>

				<p className='text-sm opacity-50'>Topics:</p>
				<div className='flex flex-wrap gap-2 mt-2 text-black'>
					<span
						className={`text-xs font-semibold mr-2 px-3 py-1 rounded-full cursor-pointer select-none hover:bg-pink-300 hover:text-black ${
							selectedTopic === 'pinned' ? "bg-pink-200 text-black" : "bg-zinc-200 dark:bg-zinc-600 dark:text-white"
						}`}
						onClick={() => setSelectedTopic('pinned')}>
						<i className="fa-solid fa-star"></i>
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
					<span
						className={`text-xs font-semibold mr-2 px-3 py-1 rounded-full cursor-pointer select-none hover:bg-pink-300 hover:text-black ${
							selectedTopic === null ? "bg-pink-200 text-black" : "bg-zinc-200 dark:bg-zinc-600 dark:text-white"
						}`}
						onClick={() => setSelectedTopic(null)}>
						all
					</span>
				</div>
			</div>
		</div>
	);
};

export default TopicSelector;
