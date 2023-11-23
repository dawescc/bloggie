import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Toaster, toast } from 'sonner';

const PinButton = ({ ArticleID }) => {
    const [session, setSession] = useState(null);
    useEffect(() => {
        setSession(supabase.auth.getSession());

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const pinArticle = async (ArticleID) => {
        const { error } = await supabase.from("articles").update({ pinned: true }).eq("id", ArticleID);
        if (error) {
            console.error("Error updating post:", error);
            toast.error('Error!', {
                description: `Unable to pin ${ArticleID}.`,
            });
        } else {
            toast.success('Success!', {
                description: `Pinned ${ArticleID}.`,
            });
        }
    };

    const handlePin = async (ArticleID) => {
        const result = await pinArticle(ArticleID);
        return null;
    };

    return (
        <span className='px-2 text-sm flex items-center justify-center content-center text-zinc-700 dark:text-zinc-300 cursor-pointer rounded-lg shadow-sm border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 hover:bg-opacity-50'>
            <span
                className=''
                onClick={() => handlePin(ArticleID)}>
                <i className='fa-solid fa-thumbtack'></i>
            </span>
        </span>
    );
};

export default PinButton;
