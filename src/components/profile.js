const Profile = ({ props }) => {
	return (
		<div className='w-full overflow-hidden'>
			<div className='w-full h-full flex flex-col py-6 gap-8 font-medium'>
				<span className='text-4xl'>ryan</span>
				<span className='text-2xl'>football fan + developer</span>
				<span className='flex flex-col gap-2 max-w-min text-sm text-sky-400 font-normal'>
					<a
						href='https://dawes.cc'
						className='hover:underline flex items-center justify-start content-center whitespace-nowrap'>
						visit my website&nbsp;&nbsp;<i className="fa-solid fa-arrow-right-long m-0 p-0"></i>
					</a>

					<a
						href='https://github.com/dawescc'
						className='hover:underline flex items-center justify-start content-center whitespace-nowrap'>
						visit my github&nbsp;&nbsp;<i className="fa-solid fa-arrow-right-long m-0 p-0"></i>
					</a>
				</span>
			</div>
		</div>
	);
};

export default Profile;
