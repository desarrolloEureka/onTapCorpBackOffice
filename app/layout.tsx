import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import './globals.css';
import { globalConfig } from '@/config/globalConfig';
import '../public/assets/css/icons.css';
import '../styles/globals.scss';
import './input.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: globalConfig.name,
  description: globalConfig.description,
  icons: {
    icon: globalConfig.icon, // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={inter.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
