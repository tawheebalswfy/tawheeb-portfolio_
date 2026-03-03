import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getSupabaseClient, type Project } from '@/lib/supabase';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/constants';

async function getFeaturedProjects() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(6);

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data as Project[];
}

export default async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">أحدث المشاريع</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استعرض مجموعة من أبرز المشاريع التي نفذتها في مجالات الذكاء الاصطناعي والبرمجة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="group"
            >
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden card-hover h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
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
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
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

        <div className="text-center mt-12">
          <Button asChild size="lg" className="gap-2">
            <Link href="/portfolio">
              عرض جميع المشاريع
              <ArrowLeft size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
