export const FloatingButton = ({ onOpen }) => {
	return (
		<button
			onClick={onOpen}
			className='fixed bottom-0 right-0 m-5 md:mr-10 lg:mr-20 rounded-full p-3
       bg-sky-300 hover:bg-sky-400 cursor-pointer select-none border border-sky-500 text-sky-700 hover:text-sky-100
       text-[1.15rem]/[1.15rem] font-bold whitespace-nowrap flex content-center items-center'>
		<i className="fa-solid fa-paper-plane pr-[0.15rem]"></i>
		</button>
	);
};
