import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export const ArticleForm = ({ isOpen, onClose, replyTo }) => {
	const [content, setContent] = useState('');
	const [topic, setTopic] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.getSession());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    let postData = { content, topic, reply_to: replyTo };
  
    const { data, error } = await supabase
      .from('articles')
      .insert([postData]);
  
    setIsLoading(false);
  
    if (error) {
      console.error('Error submitting post:', error);
    } else {
      setContent('');
      setTopic('');
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
					<form
						onSubmit={handleSubmit}
						className='space-y-4'>
						<textarea
							className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg resize-none bg-gray-400 dark:bg-gray-600'
							placeholder="What's happening?"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
						/>
						<input
							className='w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg resize-none bg-gray-400 dark:bg-gray-600'
							placeholder='Topic (optional)'
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
						/>

						<div className='px-4 py-3 text-right'>
							<button
								type='button'
								onClick={onClose}
								className='py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2'>
								<i className='fas fa-times'></i> Cancel
							</button>
							<button
								type='submit'
								className='py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2'>
								<i className='fas fa-plus'></i> Post
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
  );
}

