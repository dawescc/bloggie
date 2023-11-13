const MadeWithLove = ({session}) => {
	return (
		<div className='flex flex-col gap-2 items-center pt-1 pb-2'>
			<p className='w-full text-center text-[0.75rem]/[0.75rem] text-gray-400 dark:text-gray-600'>
				made with <i className='fa-solid fa-heart transition-all ease-in-out duration-400 hover:text-red-500 hover:animate-pulse'></i> Ryan Dawes
			</p>

            {session && (
				<div className='rounded-full px-3 py-1 bg-green-300 border border-green-500 text-green-600 text-[0.75rem]/[0.75rem] font-bold'>Signed In</div>
			)}
		</div>
	);
};

export default MadeWithLove;
