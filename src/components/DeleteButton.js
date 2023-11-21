import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../utils/supabaseClient";

const DeleteButton = ({ ArticleID }) => {
	const [session, setSession] = useState(null);
	useEffect(() => {
		setSession(supabase.auth.getSession());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	const deleteArticle = async (ArticleID) => {
		const { error } = await supabase.from("articles").delete().eq("id", ArticleID);
		if (error) {
			console.error("Error deleting post:", error);
			return { success: false, error };
		}
		return { success: true };
	};

	const handleDelete = async (ArticleID) => {
		console.log(ArticleID);
		if (window.confirm(`Are you sure?`)) {
			const result = await deleteArticle(ArticleID);
			if (!result.success) {
				alert("Failed to delete the article.");
			}
		}
		return null;
	};

	return (
		<span className='px-2 text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer rounded-lg shadow-sm border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 hover:bg-opacity-50'>
			<span
				className=''
				onClick={() => handleDelete(ArticleID)}>
				<i className='fa-solid fa-trash-can'></i>
			</span>
		</span>
	);
};

export default DeleteButton;
