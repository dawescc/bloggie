import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Toaster, toast } from 'sonner'

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
			toast.error('Error!', {
				description: `Unable to delete ${ArticleID}.`,
			})
		}
		toast.success('Success!', {
			description: `Deleted ${ArticleID}.`,
		})
	};

	const handleDelete = async (ArticleID) => {
		if (window.confirm(`Are you sure?`)) {
			const result = deleteArticle(ArticleID);
		}
		return null;
	};

	return (
		<div className='py-1 px-2 cursor-pointer hover:bg-white hover:bg-opacity-20'>
			<span
				className='flex items-center justify-center content-center'
				onClick={() => handleDelete(ArticleID)}>
				<i className='fa-solid fa-trash-can'></i>&nbsp;Delete
			</span>
		</div>
	);
};

export default DeleteButton;
