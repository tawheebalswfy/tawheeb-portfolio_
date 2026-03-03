import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { getSupabaseClient, type BlogPost } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export const metadata: Metadata = {
  title: 'المدونة - ' + SITE_CONFIG.name,
  description: 'مقالات ونصائح حول البرمجة، الذكاء الاصطناعي، وتطوير البرمجيات',
};

// ISR caching (رسمي من Next)
export const revalidate = 600;

async function getBlogPosts() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return (data ?? []) as BlogPost[];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main>
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom text-center">
            <h1 className="mb-6">المدونة</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              مقالات ونصائح تقنية حول البرمجة، الذكاء الاصطناعي، وأفضل الممارسات في تطوير البرمجيات
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  لا توجد مقالات منشورة حالياً
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-card rounded-xl border shadow-sm overflow-hidden card-hover h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={post.image_url}
                          alt={post.title_ar}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {format(new Date(post.created_at), 'dd MMM yyyy', { locale: ar })}
                          </span>
                          <Badge variant="secondary">{post.category}</Badge>
                        </div>

                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title_ar}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                          {post.excerpt_ar}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {(post.tags ?? []).slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-md">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
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