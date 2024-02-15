import { MessageSquarePlus, LogOut } from "lucide-react";
import AuthButton from "./AuthButton";
import { PostDrawer } from "./PostDrawer";

export default function MenuBar() {
	return (
		<div className='z-[1] py-2 w-full px-2 text-sm font-bold fixed bottom-0 flex'>
			<div className='flex flex-col m-2 ml-auto items-center gap-6'>
				<PostDrawer
					title={`New`}
					children={
						<span className='button menubarbutton-bgs ring ring-inset ring-black/10 dark:ring-white/10'>
							<span className='flex items-center justify-center'>
								<MessageSquarePlus size={"2em"} />
							</span>
						</span>
					}
				/>
				<AuthButton
					children={
						<button className='button bg-rose-200 text-rose-500 ring ring-inset ring-rose-500/20'>
							<span className='flex items-center justify-center'>
								<LogOut size={"1.25em"} />
							</span>
						</button>
					}
				/>
			</div>
		</div>
	);
}
