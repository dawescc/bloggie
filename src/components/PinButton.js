import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { Toaster, toast } from "sonner";

const PinButton = ({ ArticleID, bool }) => {
	const [session, setSession] = useState(null);
	useEffect(() => {
		setSession(supabase.auth.getSession());

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	const pinArticle = async (ArticleID, bool) => {
		try {
			const action = bool === 'true' ? "pinned" : "unpinned";
			const { error } = await supabase.from("articles").update({ pinned: bool === 'true' }).eq("id", ArticleID);
			if (!error) {
				toast.success("Success!", {
					icon: <i className='fa-solid fa-thumbs-up'></i>,
					description: `Article ${ArticleID} successfully ${action}.`,
				});
			} else {
				throw error;
			}
		} catch (error) {
			toast.error("Error!", {
				icon: <i className='fa-solid fa-error'></i>,
				description: `Error ${action === 'pinned' ? 'pinning' : 'unpinning'} article ${ArticleID}.`,
			});
		}
	};
	
	
	const handlePin = async (ArticleID, bool) => {
		if (window.confirm(`Are you sure?`)) {
			await pinArticle(ArticleID, bool);
		}
	};
	

	return (
		<span
			className='py-1 flex items-center justify-center content-center cursor-pointer hover:bg-white hover:bg-opacity-20'
			onClick={() => handlePin(ArticleID, bool)}>
			{bool === 'true' ? <i className='fa-solid fa-thumbtack'></i> : <i className="fa-solid fa-circle-minus"></i>}
		</span>
	);
};

export default PinButton;
