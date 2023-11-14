const MadeWithLove = ({props}) => {
	return (
		<div className='flex flex-col gap-2 items-center pt-1 pb-2'>
			<p className='w-full text-center text-[0.75rem]/[0.75rem] text-zinc-400 dark:text-zinc-600'>
				made with <i className='fa-solid fa-heart transition-all ease-in-out duration-400 hover:text-red-500 hover:animate-pulse'></i>
			</p>
		</div>
	);
};

export default MadeWithLove;
