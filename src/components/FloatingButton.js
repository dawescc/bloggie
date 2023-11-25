import { ArticleForm } from "@/components/ArticleForm";
import { useEffect, useState } from "react";
import { Drawer } from "vaul";

export const FloatingButton = ({open, setOpen, session, replyTo, setReplyTo }) => {


	return (
		<Drawer.Root open={open} onClose={() => setOpen(false)} shouldScaleBackground>
			<Drawer.Trigger asChild>
				<button
					onClick={() => {setOpen(true); setReplyTo(null);}}
					className='fixed bottom-0 right-0 m-5 md:mr-10 lg:mr-20 rounded-full p-3
						flex justify-center content-center items-center shadow-md
						cursor-pointer border text-[1.15rem]/[1.15rem] select-none font-bold
						bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700'>
						<span className="flex gap-1 items-center justify-center content-center">
							<span className="text-sm">new</span>
							<i className="fa-solid fa-feather-pointed"></i>
						</span>
				</button>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40' />
				<Drawer.Content className='bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-white flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0'>
					<div className='p-4 rounded-t-[10px] flex-1'>
						<div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8' />
						<div className='max-w-md mx-auto'>
							<Drawer.Title className='font-medium mb-4'>New Post</Drawer.Title>
							<ArticleForm replyTo={replyTo} session={session} setOpen={setOpen} />
						</div>
					</div>
					<div className='p-4 border-t border-zinc-300 dark:border-zinc-700 mt-auto'>
						<div className='flex gap-6 justify-end max-w-md mx-auto'>
						</div>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};
