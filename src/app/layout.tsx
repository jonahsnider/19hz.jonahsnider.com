import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';
import './globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { TooltipProvider } from '@/components/ui/tooltip';

export const metadata: Metadata = {
	title: '19hz.info RSS feed',
	description: 'An RSS feed of music events from 19hz.info',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning className='bg-background'>
			<body className='antialiased container mx-auto px-2'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<TooltipProvider>
						<div className='flex flex-col min-h-screen gap-8'>
							<Header />
							{children}
							<Footer />
						</div>
					</TooltipProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
