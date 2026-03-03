import Link from 'next/link';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 to-transparent" />

      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-balance">
            <span className="text-gradient">توهيب الصوفي</span>
          </h1>

          <p className="mb-4 text-xl md:text-2xl font-semibold text-foreground">
            مبرمج ومطور ويب متكامل، متخصص في الذكاء الاصطناعي والحلول البرمجية
          </p>

          <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
            أقدم حلولاً برمجية مبتكرة، من تطوير المواقع والتطبيقات إلى مشاريع الذكاء الاصطناعي والخدمات الطلابية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-primary">
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <MessageCircle size={20} />
                تواصل معي الآن
              </a>
            </Button>

            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/portfolio">
                استعرض أعمالي
                <ArrowLeft size={20} />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t pt-8">
            <div>
              <div className="text-3xl font-bold text-primary">5+</div>
              <div className="text-sm text-muted-foreground mt-1">سنوات خبرة</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground mt-1">مشروع منجز</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground mt-1">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
