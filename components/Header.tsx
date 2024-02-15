import { Github, Link, Twitter } from "lucide-react";

export default function Header() {
	return (
		<div className='w-full max-w-3xl mx-auto flex flex-1 items-center'>
			<div className='w-full py-6 px-4 flex gap-6 justify-between items-center'>
				<div className='text-2xl md:text-3xl font-black flex flex-col mr-auto'>
					<span className='font-mono text-xl md:text-2xl'>blog.</span>dawes
				</div>
				<div className='flex gap-4 md:gap-2 justify-evenly items-center h-full *:font-normal text-link'>
					<a
						className='underline inline-flex items-center button button-bgs'
						href='https://dawes.cc'>
						<Link size={"1rem"} />
					</a>
					<a
						className='underline inline-flex items-center button button-bgs'
						href='https://x.com/dawescc'>
						<Twitter size={"1rem"} />
					</a>
					<a
						className='underline inline-flex items-center button button-bgs'
						href='https://github.com/dawescc'>
						<Github size={"1rem"} />
					</a>
				</div>
			</div>
		</div>
	);
}
