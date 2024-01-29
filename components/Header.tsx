export default function Header() {
	return (
		<div className='w-full flex flex-1 items-center'>
			<div className='w-full py-6 px-2 flex justify-between items-end *:font-medium'>
				<span className='text-4xl'>ryan dawes</span>
				<a
					className='underline max-w-fit text-blue-500'
					href='https://dawes.cc'>
					website
				</a>
			</div>
		</div>
	);
}
