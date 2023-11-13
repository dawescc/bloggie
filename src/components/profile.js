const Profile = ({name}) => {
    return (
    <div className='w-full flex flex-col items-center'>
        <div className='w-full my-4 h-12 rounded-lg shadow-sm border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800'>
            {name}
        </div>
    </div>
    );
};

export default Profile;