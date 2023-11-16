const Profile = ({ props }) => {
	return (
		<div className='w-full flex flex-col items-center p-4 pt-8 pb-6 border-b border-zinc-200 dark:border-zinc-700 '>
			<div className='flex flex-col w-full rounded-lg shadow-sm border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 overflow-hidden'>
				<span className='h-3/4 flex gap-1 dark:bg-zinc-900 bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 border-b border-zinc-200 dark:border-zinc-700 px-3 py-2 overflow-auto'>
					<div className='flex flex-col gap-2'>
						<div className='h-20 w-20 rounded-lg overflow-hidden border-zinc-200 dark:border-zinc-700 border'>
							<img className='object-cover w-full h-full' src='https://neutgwolrftsfsvfhutp.supabase.co/storage/v1/object/public/blog/16bmtkif9g3i.png'/>
						</div>
						<span className='text-[1.5rem]/[1.5rem] font-semibold'>ryan</span>
						<span className='text-[0.75rem]/[1.5rem] font-light'>football fan, developer</span>

					</div>
				</span>

				<span className='h-1/4 px-3 py-2 flex gap-2 flex-wrap'>
					<a href='https://dawes.cc' className='text-[0.65rem]/[1.0rem] font-light hover:underline
						 dark:bg-zinc-900 bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 rounded-full items-baseline text-center content-center px-2 py-1
						 border-zinc-300 dark:border-zinc-700 border hover:bg-opacity-10'>dawes.cc</a>

					<a href='https://twitter.com/dawescc' className='text-[0.65rem]/[1.0rem] font-light hover:underline
						 dark:bg-zinc-900 bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 rounded-full items-baseline text-center content-center px-2 py-1
						 border-zinc-300 dark:border-zinc-700 border hover:bg-opacity-10'>twitter</a>
				</span>
			</div>
		</div>
	);
};

export default Profile;
