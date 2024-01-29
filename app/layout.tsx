import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "blog - dawes.cc",
	description: "blog by ryan dawes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang='en'
			className={GeistSans.className}>
			<body className={cn("antialiased bg-neutral-200 dark:bg-neutral-950 dark:text-neutral-100 text-neutral-950")}>
				<main className='min-h-dvh h-dvh w-full flex flex-col'>{children}</main>
			</body>
		</html>
	);
}
