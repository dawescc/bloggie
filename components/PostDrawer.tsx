"use client";

import { useState, useRef } from "react";
import { Drawer } from "vaul";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { BadgeX } from "lucide-react";

type FormData = {
	content: string;
	topic: string;
	image_url?: string | null;
	reply_to?: string | null;
};

type PostDrawerProps = {
	title: string;
	replyID?: string;
	children: React.ReactNode;
};

export function PostDrawer({ replyID, title, children }: PostDrawerProps) {
	const [open, setOpen] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		content: "",
		topic: "",
		image_url: null,
		reply_to: replyID,
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [validationError, setValidationError] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);

	const triggerFileInput = () => {
		fileInputRef.current?.click();
	};

	const resetForm = () => {
		setFormData({
			content: "",
			image_url: null,
			topic: "",
			reply_to: null,
		});
		setSelectedFile(null);
		setIsSubmitting(false);
		setValidationError("");
		setOpen(false);
	};

	async function uploadFile(file: File): Promise<string | null> {
		const supabase = createClient();
		const filePath = `uploads/${Date.now()}_${file.name}`;
		const { data, error } = await supabase.storage.from("images").upload(filePath, file);

		if (error) {
			UploadFailToast();
			return null;
		}

		const fullUrl = supabase.storage.from("images").getPublicUrl(data.path).data.publicUrl;
		UploadSuccessToast();
		return fullUrl;
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setSelectedFile(e.target.files[0]);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setValidationError("");

		// Always require a topic
		if (!formData.topic.trim()) {
			setValidationError("Topic is required.");
			setIsSubmitting(false);
			return;
		}

		// Require content if no image is selected
		if (!formData.content.trim() && !selectedFile) {
			setValidationError("Content is required when no image is uploaded.");
			setIsSubmitting(false);
			return;
		}

		let imageUrl = null;

		if (selectedFile) {
			const uploadedUrl = await uploadFile(selectedFile);
			if (uploadedUrl) {
				imageUrl = uploadedUrl;
			}
		}

		try {
			const supabase = createClient();
			await supabase.from("articles").insert([
				{
					content: formData.content,
					topic: formData.topic,
					image_url: imageUrl,
					reply_to: formData.reply_to,
				},
			]);

			PostSuccessToast();
			resetForm();
		} catch (error) {
			PostFailToast();
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Drawer.Root
			direction='right'
			dismissible={false}
			open={open}>
			<Drawer.Trigger
				asChild
				onClick={() => setOpen(true)}>
				{children}
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40' />
				<Drawer.Content className='flex flex-col bg-white dark:bg-black rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0'>
					<div className='p-4 card-bg flex-1 h-full'>
						<div className='max-w-md mx-auto'>
							<Drawer.Title className='font-medium mb-4'>Submit a new post. {replyID && <span>Replying To: {replyID}</span>}</Drawer.Title>
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
									<label className='w-full flex flex-col items-center justify-center text-sm font-medium button button-bgs'>
										<button
											type='button'
											onClick={triggerFileInput}>
											(Optional) Upload Image
										</button>
									</label>
									{selectedFile && (
										<div className='mt-2 inline-flex gap-2 items-center w-full max-w-full truncate button button-colors ring-1 ring-black/10 dark:ring-white/10'>
											<span
												className={"inline-flex items-center bg-red-600 text-white justify-center p-1 rounded-md cursor-pointer"}
												onClick={() => setSelectedFile(null)}>
												<BadgeX />
											</span>{" "}
											{selectedFile.name}
										</div>
									)}
									<input
										ref={fileInputRef}
										type='file'
										id='file'
										name='file'
										accept='.jpeg, .jpg, .png, .webp, .heic'
										onChange={handleFileChange}
										className='hidden' // Hide the actual input
									/>
								</div>
								{validationError && <div className='text-red-500'>{validationError}</div>}
								<button
									type='submit'
									disabled={isSubmitting}
									className='w-full flex flex-col items-center justify-center text-sm font-medium button action-button'>
									{isSubmitting ? "Submitting..." : "Submit"}
								</button>
								<button
									type='button' // Change to "button" to prevent form submission
									onClick={resetForm}
									disabled={isSubmitting}
									className='w-full flex flex-col items-center justify-center text-sm font-medium button button-bgs'>
									Cancel
								</button>
							</form>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
}

function PostSuccessToast() {
	toast.success("Post submitted!");
}

function PostFailToast() {
	toast.error("Unable to submit post!");
}

function UploadSuccessToast() {
	toast.success("Image uploaded!");
}

function UploadFailToast() {
	toast.error("Unable to upload image!");
}
