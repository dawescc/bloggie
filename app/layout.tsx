import { Be_Vietnam_Pro } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "blog - dawes.cc",
	description: "blog by ryan dawes",
};

// If loading a variable font, you don't need to specify the font weight
const BeVietnamPro = Be_Vietnam_Pro({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className={BeVietnamPro.className}>
			<body className={"antialiased bg-neutral-200 dark:bg-neutral-950 dark:text-neutral-100 text-neutral-950"}>
				<Toaster
					position='top-right'
					richColors
				/>
				<main className='min-h-dvh h-dvh w-full flex flex-col'>{children}</main>
			</body>
		</html>
	);
}
