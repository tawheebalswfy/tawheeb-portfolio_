import { SITE_CONFIG } from './constants';

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    jobTitle: 'مبرمج ومطور ويب متكامل',
    description: SITE_CONFIG.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.whatsapp,
    knowsAbout: [
      'الذكاء الاصطناعي',
      'تطوير الويب',
      'البرمجة',
      'React',
      'Next.js',
      'Python',
      'TensorFlow',
      'Node.js',
    ],
    sameAs: [
      SITE_CONFIG.whatsappLink,
    ],
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.whatsapp,
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description: SITE_CONFIG.description,
    inLanguage: 'ar',
  };
}

export function generateServiceSchema(service: {
  title: string;
  description: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedDate: string;
  image: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedDate,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    image: article.image,
  };
}
