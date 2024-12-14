import './globals.css';
import { Cormorant } from 'next/font/google';
import Script from 'next/script';

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: 'Do Something For A Minute - One Minute Timer',
  description: 'A simple and elegant one-minute timer to help you focus on a single task. Perfect for quick exercises, meditation, or any brief activity that needs timing.',
  keywords: 'timer, one minute timer, focus timer, productivity tool, meditation timer',
  authors: [{ name: 'Mustafa Saraç', url: 'https://mustafasarac.com' }],
  creator: 'Mustafa Saraç',
  publisher: 'Mustafa Saraç',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Do Something For A Minute - One Minute Timer',
    description: 'A simple and elegant one-minute timer to help you focus on a single task. Perfect for quick exercises, meditation, or any brief activity that needs timing.',
    url: 'https://dosomethingforaminute.com',
    siteName: 'Do Something For A Minute',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Do Something For A Minute - One Minute Timer',
    description: 'A simple and elegant one-minute timer to help you focus on a single task.',
    creator: '@mustafasarac',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'G-LJGS4DQHHJ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cormorant.className}>
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-LJGS4DQHHJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LJGS4DQHHJ');
            `,
          }}
        />
        {/* Schema.org markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Do Something For A Minute',
              description: 'A simple and elegant one-minute timer to help you focus on a single task.',
              author: {
                '@type': 'Person',
                name: 'Mustafa Saraç',
                url: 'https://mustafasarac.com'
              },
              applicationCategory: 'Productivity',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD'
              }
            })
          }}
        />
      </head>
      <body className="bg-[#EDEDED] text-[#32302D]">{children}</body>
    </html>
  );
}
