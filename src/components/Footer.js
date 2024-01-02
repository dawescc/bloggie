const Footer = ({ props }) => {
	return (
		<div className='flex px-8 pt-6 pb-10 text-[0.8rem]/[0.8rem]'>
			<div className='flex w-full items-center justify-center content-center'>
				<div className='pt-3 pb-4 '>
						<span className='text-sm flex gap-1'>
							<span>
								More can be found on my&nbsp;
								<a
									href='https://dawes.cc'
									className='hover:underline cursor-pointer'>
									website
								</a>
								&nbsp;or&nbsp;
								<a
									href='https://github.com/dawescc'
									className='hover:underline cursor-pointer'>
									github
								</a>
							</span>
						</span>
				</div>
			</div>
		</div>
	);
};

export default Footer;
