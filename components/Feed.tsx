import getData from "@/actions/GetData";
import { Suspense } from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import Image from "next/image";

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
			<div className='grid transition-all duration-200 grid-cols-1 gap-y-16'>
				{data.map((article: any, index: any) => {
					const degree = (Math.floor(Math.random() * 1.25) + 2) * (index % 2 === 0 ? -1 : 1);
					return (
						<div
							key={article.id}
							id={article.id}
							style={{ transform: `rotate(${degree}deg)` }}
							className={`post-card hover:scale-[1.025] hover:-rotate-[${degree}deg] hover:isolate`}>
							{article.image_url && (
								<Image
									width={500}
									height={500}
									alt='Post Image'
									src={article.image_url}
									className='post-image'
								/>
							)}
							<p className={`post-topic ${article.topic.replace(/\s/g, "-").toLowerCase()}`}>{article.topic}</p>
							<p className='post-content'>{article.content}</p>
							<p className='post-date'>{formatDate(article.created_at)}</p>
							{article.reply_to && (
								<a
									href={`#${article.reply_to}`}
									className={`post-reply clean hover:rotate-[${degree}deg]`}>
									{article.reply_to_image_url && (
										<Image
											width={500}
											height={500}
											alt='Post Image'
											src={article.reply_to_image_url}
											className='post-image'
										/>
									)}
									<p className='post-content'>{article.reply_to_content}</p>
									<p className='post-date'>{formatDate(article.reply_to_created_at)}</p>
								</a>
							)}
						</div>
					);
				})}
			</div>
		</Suspense>
	);
}
