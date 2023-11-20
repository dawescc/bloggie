const Profile = ({ props }) => {
	return (
		<div className='w-full h-52 flex overflow-hidden
						border-b border-zinc-200 dark:border-zinc-700
						bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'>

			<div className="w-full h-full flex pt-10 px-6 gap-2">
				<div className="flex-grow"></div>
				<div className='h-full flex flex-col gap-4 text-zinc-950'>
					<span className='font-bold text-2xl'>ryan</span>
					<span className='text-lg whitespace-nowrap'>football fan + developer</span>
					<span className='w-full flex gap-4 items-center content-center flex-wrap text-xs'>
						<a
							href='https://dawes.cc'
							className='underline'>
							website
						</a>

						<a
							href='https://github.com/dawescc'
							className='underline'>
							github
						</a>
					</span>
				</div>
				<img src="images/ryan.svg" className="w-1/3 h-full translate-y-2"/>
				<div className="flex-grow"></div>
			</div>

		</div>
	);
};

export default Profile;
