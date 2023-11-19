export const FloatingButton = ({ onOpen }) => {
	return (
		<button
			onClick={onOpen}
			className='fixed bottom-0 right-0 m-5 md:mr-10 lg:mr-20 rounded-t-full rounded-l-full p-3
						flex justify-center content-center items-center
						bg-pink-300 hover:bg-pink-400 cursor-pointer border border-pink-500 text-pink-700 hover:text-sky-100
            			text-[1.15rem]/[1.15rem] select-none font-bold '>
		<i className="fa-solid fa-signature"></i>
		</button>
	);
};
