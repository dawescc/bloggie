import { Link } from "lucide-react";

export default function Header() {
	return (
		<div className='w-full flex flex-1 items-center'>
			<div className='w-full py-6 px-4 flex flex-col gap-6 md:flex-row justify-between items-center *:font-medium'>
				<div className='text-5xl md:text-7xl'>ryan dawes</div>
				<div className='flex justify-evenly items-center w-full md:w-auto md:flex-col md:h-full'>
					<a
						className='underline max-w-fit text-blue-500 inline-flex items-center'
						href='https://dawes.cc'>
						<Link size={16} />
						&nbsp;website
					</a>
					<a
						className='underline max-w-fit text-blue-500 inline-flex items-center'
						href='https://x.com/dawescc'>
						<Link size={16} />
						&nbsp;twitter
					</a>
					<a
						className='underline max-w-fit text-blue-500 inline-flex items-center'
						href='https://github.com/dawescc'>
						<Link size={16} />
						&nbsp;github
					</a>
				</div>
			</div>
		</div>
	);
}
