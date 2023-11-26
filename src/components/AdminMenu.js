import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import DeleteButton from "./DeleteButton";
import PinButton from "./PinButton";
import ReplyButton from "./ReplyButton";

export const AdminMenu = ({ ArticleID, bool, onReplyClick }) => {
	return (
		<span className='absolute top-0 right-0 origin-top-right m-2'>
			<Menu
				as='div'
				className='relative'>
				<div>
					<Menu.Button
						className='relative flex item-center justify-center content-center px-1 py-[0.20rem] rounded-full focus:outline-none
                    bg-opacity-25 bg-zinc-400 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'>
						<i className='fa-solid fa-ellipsis'></i>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'>
					<Menu.Items
						className='absolute z-10 flex flex-col right-0 mt-2 origin-top-right
                                       divide-y divide-zinc-300 dark:divide-zinc-700
                                       rounded-md shadow-md focus:outline-none
                                       bg-zinc-100 dark:bg-zinc-800
                                       border border-zinc-300 dark:border-zinc-700'>
						<Menu.Item>
							<span className="">
								<ReplyButton
									ArticleID={ArticleID}
									onReplyClick={onReplyClick}
								/>
							</span>
						</Menu.Item>
						<Menu.Item>
							<span className="">
								<DeleteButton ArticleID={ArticleID} />
							</span>
						</Menu.Item>
						<Menu.Item>
							<span className="">
								<PinButton
									ArticleID={ArticleID}
									bool={bool}
								/>
							</span>
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		</span>
	);
};
