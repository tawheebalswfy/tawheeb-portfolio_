import Link from 'next/link';
import { Mail, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">{SITE_CONFIG.name}</h3>
            <p className="text-sm text-muted-foreground">
              مبرمج ومطور ويب متكامل، متخصص في الذكاء الاصطناعي والحلول البرمجية
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">روابط سريعة</h4>
            <ul className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">الخدمات</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>خدمات الذكاء الاصطناعي</li>
              <li>خدمات البرمجة الشاملة</li>
              <li>الخدمات الطلابية</li>
              <li>استشارات تقنية</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold">تواصل معي</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Mail size={16} />
                {SITE_CONFIG.email}
              </a>
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone size={16} />
                {SITE_CONFIG.whatsapp}
              </a>
            </div>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {SITE_CONFIG.name}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
