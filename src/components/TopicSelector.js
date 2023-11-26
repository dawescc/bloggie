import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const TopicSelector = ({ selectedTopic, setSelectedTopic }) => {
	const [topics, setTopics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
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

		const init = () => {
			window.addEventListener("scroll", handleScroll);
		};

		if (document.readyState === "complete") {
			init();
		} else {
			window.addEventListener("load", init);
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("load", init);
		};
	}, []);

	if (loading) {
		return (
			<span className='flex p-2 text-xs items-center justify-center content-center'>
				<Loader />
			</span>
		);
	}

	if (error) {
		return <p>Error fetching topics: {error}</p>;
	}

	const baseClasses = "rounded-full px-3 py-1 text-sm font-medium transition ease-in-out duration-300 shadow-sm cursor-pointer select-none border";

	const combinedModeClasses = "bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200 hover:border-zinc-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:hover:border-zinc-600";
	
	const topicStyle = (currentTopic, selectedTopic) =>
	  `${baseClasses} ${combinedModeClasses} ${currentTopic === selectedTopic ? "ring-1 ring-inset ring-zinc-400" : ""}`;
	

	const TopicButton = ({ topic, onClick, selectedTopic }) => (
		<span
			className={topicStyle(topic, selectedTopic)}
			onClick={onClick}>
			{topic === "pinned" ? <i className='fa-solid fa-star'></i> : topic === null ? "all" : topic}
		</span>
	);

	return (
		<div
			id='topics'
			className='flex items-center sticky top-0 z-10 py-4 pt-2 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-300 dark:border-zinc-700'>
			<div className='h-full w-full'>
				<div
					id='topicsTop'
					className='overflow-hidden transition-all ease-in-out duration-[575ms] max-h-0 opacity-0'>
					<span className='pb-2 pt-1 w-full h-full flex items-center'>
						<a
							href='/'
							className='font-semibold hover:underline cursor-pointer'>
							ryan
						</a>
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

				<p className='text-sm'>Topics</p>
				<div className='flex flex-wrap gap-2 mt-4 text-[0.85rem]/[1.15rem] font-semibold '>
					<TopicButton
						topic='pinned'
						onClick={() => setSelectedTopic("pinned")}
						selectedTopic={selectedTopic}
					/>
					{topics.map((topic, index) => (
						<TopicButton
							key={index}
							topic={topic}
							onClick={() => setSelectedTopic(topic)}
							selectedTopic={selectedTopic}
						/>
					))}
					<TopicButton
						topic={null}
						onClick={() => setSelectedTopic(null)}
						selectedTopic={selectedTopic}
						text='all'
					/>
				</div>
			</div>
		</div>
	);
};

export default TopicSelector;
