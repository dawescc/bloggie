const Profile = ({ props }) => {
	return (
		<div className='w-full flex flex-col items-center p-4 pt-8 pb-6 border-b border-zinc-200 dark:border-zinc-700'>
			<div className='w-full flex gap-4 rounded-lg shadow-sm border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 p-6 py-5'>
                
                <div className='rounded-lg overflow-hidden w-1/3 h-auto transition-all duration-700 ease-in-out border-zinc-200 dark:border-zinc-700 border'>
					<img className='object-cover object-right h-full' src="https://neutgwolrftsfsvfhutp.supabase.co/storage/v1/object/public/blog/16bmtkif9g3i.png" />
				</div>

                <div className='flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <span className='text-[2.0rem]/[2.0rem] font-semibold'>ryan dawes</span>
                        <a href="https://dawes.cc" className='text-[1.5rem]/[1.5rem] font-light hover:underline'>dawes.cc</a>
                        <span className='text-[1.0rem]/[1.0rem] font-light'>football fan, developer</span>
                    </div>
					<a
						href='/#feed'
						className='rounded-full p-3 bg-sky-300 hover:bg-sky-400 cursor-pointer select-none border border-sky-500 text-sky-700 hover:text-sky-100
       text-[0.75rem]/[0.75rem] font-bold whitespace-nowrap flex content-center items-center mr-auto'>
						Start Reading <i className="ml-2 fa-solid fa-arrow-right"></i>
					</a>
				</div>

			</div>
		</div>
	);
};

export default Profile;
