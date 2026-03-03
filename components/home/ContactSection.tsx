import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="mb-4">هل لديك مشروع؟ لنتحدث!</h2>
            <p className="text-lg text-muted-foreground">
              تواصل معي الآن للحصول على استشارة مجانية أو لمناقشة مشروعك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
              <p className="text-sm text-muted-foreground break-all">
                {SITE_CONFIG.email}
              </p>
            </a>

            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-all text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">واتساب</h3>
              <p className="text-sm text-muted-foreground">
                {SITE_CONFIG.whatsapp}
              </p>
            </a>

            <div className="p-6 bg-card rounded-xl border shadow-sm text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">استجابة سريعة</h3>
              <p className="text-sm text-muted-foreground">
                نرد خلال 24 ساعة
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="btn-primary gap-2">
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                تواصل عبر واتساب
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
