import Feed from "@/components/Feed";
import getData from "@/actions/GetData";

export default async function Content() {
	const articles = await getData();
	return (
		<div className='w-full flex h-full items-center'>
			<div className='w-full h-full pb-2 pt-4'>
				<Feed data={articles ?? []} />
			</div>
		</div>
	);
}
