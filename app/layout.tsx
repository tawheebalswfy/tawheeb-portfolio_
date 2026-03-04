
import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { SITE_CONFIG, SOCIAL_LINKS } from '@/lib/constants';

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-cairo',
});

// استخدم رابط الموقع من متغيرات البيئة، وإن لم يوجد استخدم رابط افتراضي
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://your-project.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  verification: {
    google: "nU8JpZzAvaC2hJ1KamO71csoK90_s1LOvqIge2hqB48",
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: siteUrl,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [`${siteUrl}/og-image.jpg`],
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

  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.author,
    jobTitle: 'Full Stack Developer',
    url: siteUrl,
    email: SITE_CONFIG.email,
    sameAs: [
      SOCIAL_LINKS.github,
      SOCIAL_LINKS.linkedin,
      SOCIAL_LINKS.twitter,
      SITE_CONFIG.whatsappLink,
    ].filter(Boolean),
  };

  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className={cairo.className}>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}