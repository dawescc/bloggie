import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Toaster, toast } from 'sonner'

export const ArticleForm = ({ open, setOpen, replyTo }) => {
	const [content, setContent] = useState('');
	const [topic, setTopic] = useState('');
	const [image_url, setImgURL] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
	if (open === false) {
		replyTo = null;
	}
}, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    let postData = { content, topic, reply_to: replyTo, image_url };
  
    const { data, error } = await supabase
      .from('articles')
      .insert([postData]);
  
    setIsLoading(false);
  
    if (error) {
      console.error('Error submitting post:', error);
	  toast.error('Error!', {
		description: 'Unable to deliver.',
	  })
    } else {
      setContent('');
      setTopic('');
	  setImgURL('');
	  setOpen(false)
	  toast.success('Success!', {
		description: 'Post delivered.',
	  })
    }}

  return (
	<form id="contentform"
	onSubmit={handleSubmit}
	className='space-y-4'>
	<div className='py-3 text-right flex gap-2 text-[0.75rem]/[0.75rem] w-full'>
		<span className='flex-grow flex items-center content-center'>
			{replyTo && (
				<span className='py-1 px-2 bg-black bg-opacity-25 rounded-full'>Replying to {replyTo}</span>
			)}
		</span>
		<button
			type='submit'
			className='py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700'>
			Post
		</button>
	</div>
	<textarea
		className='w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg resize-none bg-zinc-300 dark:bg-zinc-600'
		placeholder="What's happening?"
		value={content}
		onChange={(e) => setContent(e.target.value)}
		required
	/>
	<input
		className='w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg resize-none text-zinc-800 dark:text-current bg-zinc-300 dark:bg-zinc-600'
		placeholder='Topic (optional)'
		value={topic}
		onChange={(e) => setTopic(e.target.value)}
	/>
	<input
		className='w-full p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg resize-none text-zinc-800 dark:text-current bg-zinc-300 dark:bg-zinc-600'
		placeholder='Image URL (optional)'
		value={image_url}
		onChange={(e) => setImgURL(e.target.value)}
	/>
</form>
  );
}

