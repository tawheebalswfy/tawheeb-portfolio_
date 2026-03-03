import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { supabase, type Project } from '@/lib/supabase';
import { CATEGORY_LABELS, CATEGORY_COLORS, SITE_CONFIG } from '@/lib/constants';

async function getProject(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Project;
}

export async function generateStaticParams() {
  const { data } = await supabase.from('projects').select('slug');
  return data?.map((project) => ({ slug: project.slug })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProject(params.slug);

  if (!project) {
    return {
      title: 'المشروع غير موجود - ' + SITE_CONFIG.name,
    };
  }

  return {
    title: project.title_ar + ' - ' + SITE_CONFIG.name,
    description: project.description_ar,
    openGraph: {
      title: project.title_ar,
      description: project.description_ar,
      images: [project.image_url],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <section className="section-padding">
          <div className="container-custom">
            <div className="mb-8">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowRight size={20} />
                العودة إلى المشاريع
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <Badge className={`${CATEGORY_COLORS[project.category]} mb-4`}>
                    {CATEGORY_LABELS[project.category]}
                  </Badge>
                  <h1 className="mb-4">{project.title_ar}</h1>
                  <p className="text-lg text-muted-foreground">
                    {project.description_ar}
                  </p>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg">
                  <Image
                    src={project.image_url}
                    alt={project.title_ar}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {project.content_ar}
                  </div>
                </div>

                {project.images && project.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">صور إضافية</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative aspect-video rounded-lg overflow-hidden border"
                        >
                          <Image
                            src={image}
                            alt={`${project.title_ar} - صورة ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-card rounded-xl border shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">معلومات المشروع</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                        التقنيات المستخدمة
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {(project.live_url || project.github_url) && (
                      <div className="space-y-2 pt-4 border-t">
                        {project.live_url && (
                          <Button asChild className="w-full" variant="default">
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <ExternalLink size={16} />
                              زيارة المشروع
                            </a>
                          </Button>
                        )}
                        {project.github_url && (
                          <Button asChild className="w-full" variant="outline">
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="gap-2"
                            >
                              <Github size={16} />
                              مشاهدة الكود
                            </a>
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-4">
                        هل لديك مشروع مشابه؟ تواصل معي الآن
                      </p>
                      <Button asChild className="w-full btn-primary">
                        <a
                          href={SITE_CONFIG.whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          تواصل عبر واتساب
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
