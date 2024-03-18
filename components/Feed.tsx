import getData from "@/actions/GetData";
import { Suspense } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(isoDate: any) {
	const date = parseISO(isoDate);
	const formattedDate = format(date, "dd/MM/yyyy HH:mm");
	const timeAgo = formatDistanceToNow(date, { addSuffix: true });

	return `${formattedDate} (${timeAgo})`;
}

export default async function Feed() {
	let data: any = await getData()!;
	return (
		<Suspense fallback={<>Loading...</>}>
			<div className='grid grid-cols-1 gap-y-16'>
				{data.map((article: any, index: any) => {
					const degree = (Math.floor(Math.random() * 1.25) + 2) * (index % 2 === 0 ? -1 : 1);
					return (
						<div
							key={article.id}
							className='post-card'
							style={{ transform: `rotate(${degree}deg)` }}>
							<p className={`post-topic ${article.topic.replace(/\s/g, "-").toLowerCase()}`}>{article.topic}</p>
							<p className='post-content'>{article.content}</p>
							<p className='post-date'>{formatDate(article.created_at)}</p>
						</div>
					);
				})}
			</div>
		</Suspense>
	);
}
