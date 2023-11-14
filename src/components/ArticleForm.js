import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';

export const ArticleForm = ({ isOpen, onClose, replyTo }) => {
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

  const firstInputRef = useRef(null);
  useEffect(() => {
	  if (isOpen && firstInputRef.current) {
		  firstInputRef.current.focus();
	  }
  }, [isOpen]);

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
    } else {
      setContent('');
      setTopic('');
	  setImgURL('');
      onClose();
    }}

  if (!isOpen) return null;

  return (
		<div
			className='fixed z-10 overflow-y-auto top-0 w-full left-0'
			id='modal'>
			<div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
				<div className='fixed inset-0 transition-opacity'>
					<div className='absolute inset-0 bg-gray-900 opacity-75' />
				</div>
				<span className='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>
				<div
					className='inline-block align-center bg-gray-100 dark:bg-gray-800 dark:text-white rounded-lg p-2
                    text-left overflow-hidden shadow-xl transform transition-all
                    sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
					<form id="contentform"
						onSubmit={handleSubmit}
						className='space-y-4'>
						<div className='px-4 py-3 text-right flex gap-2 text-[0.75rem]/[0.75rem] w-full'>
							
							<button
								type='button'
								onClick={onClose}
								className='py-2 px-4 bg-zinc-500 text-white rounded-full hover:bg-zinc-700'>
								Cancel
							</button>
							<span className='flex-grow'></span>
							<button
								type='submit'
								className='py-2 px-4 bg-blue-500 text-white rounded-full hover:bg-blue-700'>
								Post
							</button>
						</div>
						<textarea
							ref={firstInputRef}
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
				</div>
			</div>
		</div>
  );
}

