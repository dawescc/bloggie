const Loader = () => {
	return (
		<div
			className='inline-flex h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
			role='status'> 
			<svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
		  </svg>
		</div>
	);
};

export default Loader;
