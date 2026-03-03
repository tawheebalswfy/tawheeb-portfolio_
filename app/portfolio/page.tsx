import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SITE_CONFIG } from '@/lib/constants';
import PortfolioClient from './PortfolioClient';
import { getSupabaseClient, type Project } from '@/lib/supabase';
import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
  title: 'المشاريع - ' + SITE_CONFIG.name,
  description:
    'استعرض مجموعة من أبرز المشاريع في مجالات الذكاء الاصطناعي والبرمجة والخدمات الطلابية',
};

// إعادة توليد الكاش كل 10 دقائق (تقدر تغيّرها)
export const revalidate = 600;

// كاش على مستوى السيرفر: يمنع ضرب Supabase كل مرة
const getProjectsCached = unstable_cache(
  async () => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Error fetching projects:', error);
      return [] as Project[];
    }

    return (data ?? []) as Project[];
  },
  ['projects:all'],
  { revalidate: 600 }
);

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const projects = await getProjectsCached();

  // نقرأ التصنيف الأولي فقط لتحديد الزر النشط عند فتح الصفحة
  const initialCategory =
    searchParams?.category && searchParams.category !== 'all'
      ? searchParams.category
      : 'all';

  return (
    <>
      <Header />

      <main>
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom text-center">
            <h1 className="mb-6">المشاريع</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              استعرض مجموعة من أبرز المشاريع التي نفذتها في مختلف المجالات التقنية
            </p>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-custom">
            <PortfolioClient projects={projects} initialCategory={initialCategory} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}