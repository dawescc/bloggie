export default function Header() {
	return (
		<div className='w-full flex flex-1 items-center'>
			<div className='w-full py-6 px-2 flex flex-col *:font-medium'>
				<span className='text-2xl'>ryan dawes</span>
				<a
					className='underline mr-auto'
					href='https://dawes.cc'>
					website
				</a>
			</div>
		</div>
	);
}
