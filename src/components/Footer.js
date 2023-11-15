const Footer = ({props}) => {
    return (
    <div className='flex px-8 pt-6 pb-10 text-[0.8rem]/[0.8rem]'>
        <div className="flex w-full">
            <div className="grid grid-cols-2 grid-rows-2 sm:flex sm:flex-row flex-wrap w-full gap-6 justify-around pb-4">
                <div className="flex flex-col">
                    <span className="font-semibold text-sm mb-1">Other Sites</span>
                    <ul className="flex flex-col gap-4 text-zinc-400 dark:text-zinc-500">
                        <a href="https://dawes.cc" className="hover:underline cursor-pointer">Home</a>
                        <a href="https://folio.dawes.cc" className="hover:underline cursor-pointer">Portfolio</a>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm mb-1">Connect</span>
                    <ul className="flex flex-col gap-4 text-zinc-400 dark:text-zinc-500">
                        <a href="https://x.com/dawescc" className="hover:underline cursor-pointer">Twitter</a>
                        <a href="https://github.com/dawescc" className="hover:underline cursor-pointer">Github</a>
                        <a href="mailto:noreply-blog745vf7vbt587t8@dawes.cc" className="hover:underline cursor-pointer">Contact</a>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm mb-1">Support</span>
                    <ul className="flex flex-col gap-4 text-zinc-400 dark:text-zinc-500">
                        <a href="https://ko-fi.com/dawes" className="hover:underline cursor-pointer">Ko-Fi</a>
                    </ul>
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm mb-1">Misc.</span>
                    <ul className="flex flex-col gap-4 text-zinc-400 dark:text-zinc-500">
                        <a href="https://github.com/dawescc/emems" className="hover:underline cursor-pointer">eMems</a>
                        <a href="https://porpo.dawes.cc" className="hover:underline cursor-pointer">Porpo</a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Footer;