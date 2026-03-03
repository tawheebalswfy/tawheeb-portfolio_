import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { supabase, type BlogPost } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

async function getBlogPost(slug: string) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as BlogPost;
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('published', true);

  return data?.map((post) => ({ slug: post.slug })) || [];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'المقالة غير موجودة - ' + SITE_CONFIG.name,
    };
  }

  return {
    title: post.title_ar + ' - ' + SITE_CONFIG.name,
    description: post.excerpt_ar,
    openGraph: {
      title: post.title_ar,
      description: post.excerpt_ar,
      images: [post.image_url],
      type: 'article',
      publishedTime: post.created_at,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main>
        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowRight size={20} />
                العودة إلى المدونة
              </Link>
            </div>

            <article>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {format(new Date(post.created_at), 'dd MMMM yyyy', {
                      locale: ar,
                    })}
                  </span>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <h1 className="mb-4">{post.title_ar}</h1>
                <p className="text-lg text-muted-foreground">
                  {post.excerpt_ar}
                </p>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border shadow-lg mb-8">
                <Image
                  src={post.image_url}
                  alt={post.title_ar}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-foreground leading-relaxed">
                  {post.content_ar}
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-bold mb-4">الوسوم</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <Badge key={i} variant="outline">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
