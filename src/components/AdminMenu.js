import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import DeleteButton from "./DeleteButton";
import PinButton from "./PinButton";
import ReplyButton from "./ReplyButton";

export const AdminMenu = ({ ArticleID, bool, onReplyClick }) => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
	return (
		<Menu as='div' className='relative'>
			<div>
				<Menu.Button className='relative flex item-center justify-center content-center px-1 py-[0.20rem] rounded-full focus:outline-none
                    bg-opacity-25 bg-zinc-400 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700'>
                    <i className="fa-solid fa-ellipsis"></i>
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
				<Menu.Items className='absolute left-0 z-10 mt-2 w-48 origin-top-right
                                       divide-y divide-zinc-300 dark:divide-zinc-700
                                       rounded-md shadow-lg focus:outline-none
                                       bg-zinc-200 dark:bg-zinc-800
                                       border border-zinc-300 dark:border-zinc-700'>
					<Menu.Item>
						<ReplyButton ArticleID={ArticleID} onReplyClick={onReplyClick} />
					</Menu.Item>
					<Menu.Item>
							<DeleteButton ArticleID={ArticleID} />
					</Menu.Item>
					<Menu.Item>
							<PinButton ArticleID={ArticleID} bool={bool} />
					</Menu.Item>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};
