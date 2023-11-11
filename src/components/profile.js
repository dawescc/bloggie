import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const Profile = () => {
    return (
    <div className='w-full flex flex-col'>
    <div className="h-44 lg:h-56 border-b border-slate-200 dark:border-slate-800 flex items-center">
    <div className="h-full overflow-hidden">
        <img className="" src="https://neutgwolrftsfsvfhutp.supabase.co/storage/v1/object/sign/img/banner/0.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWcvYmFubmVyLzAuanBnIiwiaWF0IjoxNjk5Mzc1OTc3LCJleHAiOjE3NjI0NDc5Nzd9.opP8BDzImKnp0FTi-4VyPQEYDYSRfNwSI5vGmWXqKhM&t=2023-11-07T16%3A52%3A57.942Z"/>
    </div>
    </div>
    <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center">
    <div className="h-full w-full relative px-2">
        <div className="rounded-lg overflow-hidden absolute -translate-y-1/2 border-4 border-slate-200 dark:border-black">
            <img id="pfp" className="h-20 w-20" src="https://neutgwolrftsfsvfhutp.supabase.co/storage/v1/object/sign/img/pfp/0.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWcvcGZwLzAucG5nIiwiaWF0IjoxNjk5Mzc2MDEyLCJleHAiOjE3NjI0NDgwMTJ9.8t98N7iwrFoqfs3z5wJskH2fnoLiCF2XWFzerRh8KVo&t=2023-11-07T16%3A53%3A32.454Z"/>
        </div>
        <div className="mt-12"></div>
        <p id="display_name" className="font-black text-2xl">ryan</p>
        <p id="handle" className="font-black text-pink-300 text-md">@ryandawes</p>
        <p id="desc" className="my-2">hi, mom!</p>
        <p className="opacity-50 text-sm select-none"><i className="mr-1 fa-solid fa-location-arrow"></i>United States, Earth</p>
        <div className="mt-2 p-2 w-full flex flex-wrap gap-x-4 gap-y-2 justify-center text-sm border border-slate-200 dark:border-slate-800 rounded-lg ">
            <a className="text-blue-400 hover:underline" href="https://dawes.cc"><i className="mr-1 text-gray-600 dark:text-gray-100 text-lg fa-solid fa-link"></i>dawes.cc</a>
            <a className="text-blue-400 hover:underline" href="https://github.com/dawescc"><i className="mr-1 text-gray-600 dark:text-gray-100 text-lg fa-brands fa-github"></i>@dawescc</a>
            <a className="text-blue-400 hover:underline" href="https://ko-fi.com/dawes"><i className="mr-1 text-gray-600 dark:text-gray-100 text-lg fa-brands fa-dollar-sign"></i>@dawescc</a>
        </div>
    </div>
    </div>
    </div>
    );
};

export default Profile;