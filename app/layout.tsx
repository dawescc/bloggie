import Footer from "@/components/Footer";
import "./globals.css";
import { Be_Vietnam_Pro } from "next/font/google";

const vietnam = Be_Vietnam_Pro({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const defaultUrl = process.env.VERCEL_URL ? `https://blog.dawes.cc/` : "http://localhost:3000";
const title = "Blog — Ryan Dawes";
export const metadata = {
	title: title,
	metadataBase: new URL(defaultUrl),
	openGraph: {
		title: title,
		url: new URL(defaultUrl),
		siteName: title,
	},
	twitter: {
		title: title,
		card: "summary_large_image",
		site: "@dawescc",
		creator: "@dawescc",
	},
	description: "A micro blog.",
};

export const viewport = {
	themeColor: "transparent",
};

export default function RootLayout({ children }: any) {
	return (
		<html
			lang='en'
			className={vietnam.className}>
			<body className='relative flex justify-center text-3xl lg:text-4xl leading-10 lg:leading-[46px] tracking-[0.02rem;] font-medium'>
				<main className='relative flex-[1_1_100%] overflow-hidden max-w-xl lg:max-w-4xl pb-32'>{children}</main>
			</body>
		</html>
	);
}
