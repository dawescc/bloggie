import Feed from "@/components/Feed";
import Footer from "@/components/Footer";

export default function Index() {
	return (
		<div className='flex flex-col gap-12 pt-20 px-8'>
			<div className='flex flex-col gap-6'>
				<p className='paragraph'>Blog</p>
				<div className='flex gap-6'>
					<a
						href='https://dawes.cc'
						className='w-fit inline-flex items-center gap-2 text-xl'>
						Website
					</a>
					<a
						href='https://github.com/dawescc/bloggie/'
						className='w-fit inline-flex items-center gap-2 text-xl'>
						Source
					</a>
				</div>
			</div>

			<Feed />
			<Footer />
		</div>
	);
}
