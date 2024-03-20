import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import NewPost from "@/components/NewPost";

export default function Index() {
	return (
		<div className='flex flex-col gap-12 pt-20 px-8 relative'>
			<div className='flex flex-col gap-6'>
				<p className='paragraph'>Blog</p>
				<div className='flex gap-6'>
					<a
						href='https://dawes.cc'
						className='w-fit inline-flex items-center gap-2 text-xl'>
						Website
					</a>
				</div>
			</div>
			<Feed />
			<Footer />
			<NewPost />
		</div>
	);
}
