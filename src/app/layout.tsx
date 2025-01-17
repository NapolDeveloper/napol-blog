import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/provider/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { siteConfig } from '@/config/site';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    '프론트엔드',
    '자바스크립트',
    '타입스크립트',
    '리액트',
    '넥트스',
    'frontend',
    'js',
    'javascript',
    'ts',
    'typescript',
    'react',
    'nextjs',
  ],
  authors: [
    {
      name: 'Napol',
      url: 'https://www.napol.dev',
    },
  ],
  creator: 'Napol',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@napol',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full scroll-my-20 scroll-smooth" suppressHydrationWarning>
      <body
        className={`${pretendard.variable} ${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-pretendard antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="mx-auto mt-[114px] w-full max-w-[800px] px-6">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
