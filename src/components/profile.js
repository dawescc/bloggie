const Profile = ({ props }) => {
	return (
		<div
			className='w-full flex flex-col gap-4 px-8 pt-20 pb-8 border-b border-zinc-200 dark:border-zinc-700
			bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100
			dark:bg-gradient-to-r dark:from-zinc-700 dark:via-zinc-900 dark:to-black
			'>
			{/* Card Container */}

			{/* Image */}
			<div
				className='h-24 w-24 aspect-square overflow-hidden
					 border-zinc-100 dark:border-zinc-800 border-4
					 shadow-md rounded-xl'>
				<img
					className='object-cover w-full h-full'
					src='https://neutgwolrftsfsvfhutp.supabase.co/storage/v1/object/public/blog/16bmtkif9g3i.png'
				/>
			</div>

			<div className='flex flex-col gap-4 text-zinc-950 dark:text-zinc-100 mr-auto'>
				<span className='font-bold text-2xl'>ryan</span>
				<span className='text-lg'>football fan + developer</span>
			</div>

			<span className='w-full px-3 py-2 flex gap-2 flex-wrap bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700'>
					<a
						href='https://dawes.cc'
						className='hover:underline text-sm flex flex-grow
						 dark:bg-zinc-900 bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 items-center justify-center rounded-md px-2 py-1
						 border-zinc-300 dark:border-zinc-700 border hover:bg-opacity-10'>
						<i className='fa-solid fa-globe'></i>
					</a>

					<a
						href='https://twitter.com/dawescc'
						className='hover:underline text-sm flex flex-grow
						 dark:bg-zinc-900 bg-zinc-300 bg-opacity-50 dark:bg-opacity-50 items-center justify-center rounded-md px-2 py-1
						 border-zinc-300 dark:border-zinc-700 border hover:bg-opacity-10'>
						<i className='fa-brands fa-twitter'></i>
					</a>
			</span>
		</div>
	);
};

export default Profile;
