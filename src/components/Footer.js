const Footer = ({props}) => {
    return (
		<div className='flex px-8 pt-6 pb-10 text-[0.8rem]/[0.8rem]'>
			<div className='flex w-full'>
				<div className='grid grid-cols-2 grid-rows-2 sm:flex sm:flex-row flex-wrap w-full gap-6 justify-around pb-4'>
					<span className='flex flex-col gap-2 md:w-1/3'>
						<span className='border-b border-zinc-700 pb-2 font-semibold text-base'>Other Sites</span>
						<span className='text-sm flex flex-col gap-1'>
                        <a
								href='https://dawes.cc'
								className='hover:underline cursor-pointer'>
								Home
							</a>
							<a
								href='https://folio.dawes.cc'
								className='hover:underline cursor-pointer'>
								Portfolio
							</a>
						</span>
					</span>
					<span className='flex flex-col gap-2 md:w-1/3'>
						<span className='border-b border-zinc-700 pb-2 font-semibold text-base'>Connect</span>
						<span className='text-sm flex flex-col gap-1'>
                        <a
								href='https://x.com/dawescc'
								className='hover:underline cursor-pointer'>
								Twitter
							</a>
							<a
								href='https://github.com/dawescc'
								className='hover:underline cursor-pointer'>
								Github
							</a>
							<a
								href='mailto:noreply-blog745vf7vbt587t8@dawes.cc'
								className='hover:underline cursor-pointer'>
								Contact
							</a>
						</span>
					</span>
					<span className='flex flex-col gap-2 md:w-1/3'>
						<span className='border-b border-zinc-700 pb-2 font-semibold text-base'>Support</span>
						<span className='text-sm flex flex-col gap-1'>
                        <a
								href='https://ko-fi.com/dawes'
								className='hover:underline cursor-pointer'>
								Ko-Fi
							</a>
						</span>
					</span>
					<span className='flex flex-col gap-2 md:w-1/3'>
						<span className='border-b border-zinc-700 pb-2 font-semibold text-base'>Misc.</span>
						<span className='text-sm flex flex-col gap-1'>
							<a href='https://github.com/dawescc/porpo'>Porpo</a>
							<a href='https://github.com/dawescc/emems'>eMems</a>
						</span>
					</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;