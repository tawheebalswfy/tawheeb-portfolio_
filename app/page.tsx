import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { getSupabaseClient, type Service } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'الخدمات - ' + SITE_CONFIG.name,
  description: 'خدمات البرمجة والذكاء الاصطناعي والخدمات الطلابية بشكل منظم وواضح',
};

export const revalidate = 600;

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

  return (data ?? []) as Service[];
}

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
          <div className="container-custom">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  لا توجد خدمات متاحة حالياً
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  إذا كانت البيانات موجودة في Supabase فغالباً السبب سياسات RLS.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-card rounded-xl border shadow-sm p-6 card-hover h-full flex flex-col"
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-secondary rounded-md">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{service.title_ar}</h3>

                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {service.description_ar}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/contact?subject=${encodeURIComponent(service.title_ar)}`}
                        className="text-sm text-primary hover:underline"
                      >
                        طلب هذه الخدمة
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}