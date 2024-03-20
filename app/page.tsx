import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import NewPost from "@/components/NewPost";
import Image from "next/image";

export default function Index() {
	return (
		<>
			<a
				href='https://twitter.com/dawescc'
				className='group w-fit'>
				<Image
					className='img-card z-[3] bg-gray-200 rotate-3 group-hover:-rotate-3 group-hover:scale-[1.05]'
					src='https://dawes.cc/images/Headshot.jpg'
					height={120}
					width={120}
					alt="Ryan's Headshot"
				/>
				<div className='img-card z-[2] bg-gray-400 -rotate-6 group-hover:rotate-6 translate-x-0 group-hover:translate-x-1'></div>
				<div className='img-card z-[1] bg-gray-700 rotate-[9deg] group-hover:-rotate-[9deg] translate-x-0 group-hover:-translate-x-1'></div>
			</a>
			<div className='flex flex-col gap-12 pt-20 px-8'>
				<div className='flex flex-col gap-6'>
					<p className='paragraph'>Blog</p>
					<div className='flex gap-6'>
						<a
							href='https://dawes.cc'
							className='w-fit inline-flex items-center gap-2 text-xl'>
							Website
						</a>
					</div>
				</div>
				<Feed />
				<Footer />
				<NewPost />
			</div>
		</>
	);
}
