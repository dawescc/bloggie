"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { createClient } from "@/utils/supabase/client";

type FormData = {
	content: string;
	topic: string;
	image_url?: string;
	reply_to?: string;
};

type PostDrawerProps = {
	title: string;
	replyID?: string;
};

export function PostDrawer({ replyID, title }: PostDrawerProps) {
	const [formData, setFormData] = useState<FormData>({
		content: "",
		topic: "",
		reply_to: replyID,
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.content.trim()) {
			alert("Content is required.");
			return;
		}

		if (!formData.topic.trim()) {
			alert("Topic is required.");
			return;
		}
		try {
			const supabase = createClient();
			const { data, error } = await supabase
				.from("articles") // Adjust the table name as needed
				.insert([
					{
						content: formData.content,
						topic: formData.topic,
						image_url: formData.image_url,
						reply_to: formData.reply_to,
					},
				]);

			if (error) throw error;

			// Handle successful submission
			console.log("Form submitted successfully:", data);
			setFormData({ content: "", topic: "", image_url: "", reply_to: "" }); // Reset form
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	};

	return (
		<Drawer.Root direction='right'>
			<Drawer.Trigger asChild>
				<span className='inline-flex items-center justify-center cursor-pointer'>{title}</span>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40' />
				<Drawer.Content className='bg-neutral-200 dark:bg-neutral-700 flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0'>
					<div className='p-4 bg-neutral-200 dark:bg-neutral-700 flex-1 h-full'>
						<div className='max-w-md mx-auto'>
							<Drawer.Title className='font-medium mb-4'>Submit a new post.</Drawer.Title>
							<form
								onSubmit={handleSubmit}
								className='space-y-4 '>
								<div>
									<label
										htmlFor='content'
										className='block text-sm font-medium text-neutral-700 dark:text-neutral-200'>
										Content
									</label>
									<textarea
										id='content'
										name='content'
										required
										className='text-black mt-1 block resize-none w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-500 focus:border-neutral-500'
										value={formData.content}
										onChange={handleChange}
									/>
								</div>
								<div>
									<label
										htmlFor='topic'
										className='block text-sm font-medium text-neutral-700 dark:text-neutral-200'>
										Topic
									</label>
									<input
										type='text'
										id='topic'
										name='topic'
										required
										className='text-black mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-500 focus:border-neutral-500'
										value={formData.topic}
										onChange={handleChange}
									/>
								</div>
								<div>
									<label
										htmlFor='image_url'
										className='block text-sm font-medium text-neutral-700 dark:text-neutral-200'>
										Image URL (Optional)
									</label>
									<input
										type='text'
										id='image_url'
										name='image_url'
										className='text-black mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-neutral-500 focus:border-neutral-500'
										value={formData.image_url || ""}
										onChange={handleChange}
									/>
								</div>
								<button
									type='submit'
									className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-neutral-600 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500'>
									Submit
								</button>
							</form>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}
