import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import Profile from '../components/profile';
import Feed from '../components/feed';

const Home = () => {

  return (
    <div className="h-full w-full flex">
    <div className="md:flex-grow h-full"></div>

    <div className="w-full md:w-10/12 lg:w-8/12 md:border-x border-slate-200 dark:border-slate-800 h-full flex flex-col">
        <div className="h-auto border-b border-slate-200 dark:border-slate-800 flex items-center">
        </div>
        <Profile />
        <div className="pt-2 w-full">
          <Feed />
        </div>
        <div className="h-auto pt-2 pb-1 flex items-center">
            <p className="w-full text-center text-xs text-gray-400 dark:text-gray-600">made with <i className="fa-solid fa-heart transition-all ease-in hover:text-red-500"></i> Ryan Dawes</p>
        </div>

    </div>

    <div className="md:flex-grow h-full"></div>
    </div>
  );
};

export default Home;
