import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export const ArticleForm = ({ isOpen, onClose, replyTo }) => {
  const { session } = useAuth();
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = {
      content,
      topic,
      reply_to: replyTo // Use replyTo prop to set the reply_to field
    };

    const token = session.Authorization;

    // Call the API to submit the article
    const response = await fetch('/api/postContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData),
    });

    if (response.ok) {
      // Handle success
      console.log('Article posted successfully');
      setContent(''); // Reset content
      setTopic(''); // Reset topic
      onClose();
    } else {
      // Handle errors
      const errorData = await response.json();
      console.error('Failed to post article:', errorData.error);
    }
  };

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
					className='inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
					>
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
};


