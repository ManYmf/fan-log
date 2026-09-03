import type { Metadata } from 'next';
import { IBM_Plex_Mono, IBM_Plex_Sans, Noto_Sans_SC } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import { siteConfig } from '../site.config';

const plexSans = IBM_Plex_Sans({
  variable: '--font-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const notoSans = Noto_Sans_SC({
  variable: '--font-noto-sans-sc',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: `${siteConfig.description.en} ${siteConfig.description.zh}`,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: `${siteConfig.description.en} ${siteConfig.description.zh}`,
    url: '/',
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plexSans.variable} ${plexMono.variable} ${notoSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
