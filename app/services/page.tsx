import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Brain, Code, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { getSupabaseClient, type Service } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'الخدمات - ' + SITE_CONFIG.name,
  description: 'خدمات برمجية شاملة تشمل الذكاء الاصطناعي، تطوير الويب والتطبيقات، والدعم الطلابي',
};

async function getServices() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data as Service[];
}

const iconMap: Record<string, typeof Brain> = {
  Brain,
  Code,
  GraduationCap,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Header />
      <main>
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom text-center">
            <h1 className="mb-6">خدماتي</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              أقدم مجموعة شاملة من الخدمات البرمجية والتقنية المتخصصة
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom space-y-16">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="mb-4">{service.title_ar}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      {service.description_ar}
                    </p>
                    <div className="prose prose-lg max-w-none mb-6">
                      <p className="text-muted-foreground">{service.details_ar}</p>
                    </div>
                  </div>

                  <div className={isEven ? '' : 'lg:order-1'}>
                    <div className="bg-card rounded-2xl border shadow-sm p-8">
                      <h3 className="text-xl font-bold mb-6">الخدمات الفرعية:</h3>
                      <ul className="space-y-3">
                        {service.sub_services.map((subService, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-1 text-lg">✓</span>
                            <span className="text-muted-foreground">{subService}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="section-padding bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="container-custom text-center">
            <h2 className="mb-4">هل أنت مستعد لبدء مشروعك؟</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              تواصل معي الآن للحصول على استشارة مجانية ومناقشة متطلبات مشروعك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  تواصل عبر واتساب
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/portfolio">استعرض أعمالي</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
