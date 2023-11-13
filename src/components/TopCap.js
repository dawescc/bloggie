import { logout } from "@/utils/handleLogout";

const TopCap = ({session}) => {

	const handleLogoutClick = async () => {
        await logout();
    };

	return (
		<div className='flex px-4 py-1 items-center bg-gray-100 dark:bg-gray-900'>
			<p className='text-[1.5rem]/[1.5rem] font-bold text-gray-600 py-1'>
				<span className='transition-all ease-in-out duration-400 hover:text-pink-300'>ryan dawes</span>
			</p>

            <div className='flex-grow'></div>

            {session && (
				<div onClick={handleLogoutClick} className='rounded-full px-3 py-1 bg-red-300 hover:bg-red-400 cursor-pointer select-none border border-red-500 text-red-700 hover:text-red-100 text-[0.75rem]/[0.75rem] font-bold whitespace-nowrap'>Sign Out</div>
			)}

		</div>
	);
};

export default TopCap;