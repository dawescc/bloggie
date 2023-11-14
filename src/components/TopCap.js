import { logout } from "@/utils/handleLogout";

const TopCap = ({session}) => {

	const handleLogoutClick = async () => {
        await logout();
    };

	return (
		<div className='flex px-5 py-3 items-center bg-white dark:bg-zinc-900'>
			<p className='text-[1.2rem]/[1.2rem] font-bold dark:text-gray-200 text-gray-700 py-1'>
				<span className=''>ryan dawes</span>
			</p>

            <div className='flex-grow'></div>

            {session ? (
				<div onClick={handleLogoutClick} className='rounded-full px-3 py-1 bg-red-300 hover:bg-red-400 cursor-pointer select-none border border-red-500 text-red-700 hover:text-red-100 text-[0.75rem]/[0.75rem] font-bold whitespace-nowrap'>Sign Out</div>
			) : (
				<div className="grid-rows-2 items-center font-black text-[0.65rem]/[0.65rem]">
					<div className="grid-cols-2 items-center">
						<span>B</span>
						<span>L</span>
					</div>
					<div className="grid-cols-2 items-center">
						<span>O</span>
						<span>G</span>
					</div>
				</div>
			)}

		</div>
	);
};

export default TopCap;