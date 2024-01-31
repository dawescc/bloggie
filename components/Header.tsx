import { Github, Link, Twitter } from "lucide-react";

export default function Header() {
	return (
		<div className='w-full flex flex-1 items-center'>
			<div className='w-full py-6 px-4 flex flex-col gap-6 ustify-between items-center'>
				<div className='text-5xl md:text-7xl font-black'>blog.dawes</div>
				<div className='flex gap-4 md:gap-2 justify-evenly items-center h-full *:font-normal'>
					<a
						className='underline max-w-fit text-blue-500 inline-flex items-center button button-bgs'
						href='https://dawes.cc'>
						<Link size={16} />
						<span className='hidden md:inline-flex'>&nbsp;website</span>
					</a>
					<a
						className='underline max-w-fit text-blue-500 inline-flex items-center button button-bgs'
						href='https://x.com/dawescc'>
						<Twitter size={16} />
						<span className='hidden md:inline-flex'>&nbsp;twitter</span>
					</a>
					<a
						className='underline max-w-fit text-blue-500 inline-flex items-center button button-bgs'
						href='https://github.com/dawescc'>
						<Github size={16} />
						<span className='hidden md:inline-flex'>&nbsp;github</span>
					</a>
				</div>
			</div>
		</div>
	);
}
