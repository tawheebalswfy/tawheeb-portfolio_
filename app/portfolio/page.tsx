import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getSupabaseClient, type Project } from '@/lib/supabase';
import { CATEGORY_LABELS, CATEGORY_COLORS, SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'المشاريع - ' + SITE_CONFIG.name,
  description: 'استعرض مجموعة من أبرز المشاريع في مجالات الذكاء الاصطناعي والبرمجة والخدمات الطلابية',
};

async function getProjects(category?: string) {
  const supabase = getSupabaseClient();
  let query = supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const projects = await getProjects(searchParams.category);
  const categories = [
    { value: 'all', label: 'الكل' },
    { value: 'ai', label: 'الذكاء الاصطناعي' },
    { value: 'programming', label: 'البرمجة' },
    { value: 'student', label: 'الخدمات الطلابية' },
  ];

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

            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={cat.value === 'all' ? '/portfolio' : `/portfolio?category=${cat.value}`}
                >
                  <Button
                    variant={
                      (cat.value === 'all' && !searchParams.category) ||
                      searchParams.category === cat.value
                        ? 'default'
                        : 'outline'
                    }
                  >
                    {cat.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  لا توجد مشاريع في هذا التصنيف حالياً
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.slug}`}
                    className="group"
                  >
                    <div className="bg-card rounded-xl border shadow-sm overflow-hidden card-hover h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={project.image_url}
                          alt={project.title_ar}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="mb-3">
                          <Badge className={CATEGORY_COLORS[project.category]}>
                            {CATEGORY_LABELS[project.category]}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {project.title_ar}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {project.description_ar}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-secondary rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs px-2 py-1 bg-secondary rounded-md">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
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
