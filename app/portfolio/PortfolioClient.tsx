'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/constants';
import type { Project } from '@/lib/supabase';

type Category = 'all' | 'ai' | 'programming' | 'student';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'الكل' },
  { value: 'ai', label: 'الذكاء الاصطناعي' },
  { value: 'programming', label: 'البرمجة' },
  { value: 'student', label: 'الخدمات الطلابية' },
];

function setUrlCategory(category: Category) {
  // تحديث الرابط بدون Navigation/Reload
  const url = new URL(window.location.href);
  if (category === 'all') url.searchParams.delete('category');
  else url.searchParams.set('category', category);
  window.history.replaceState({}, '', url.toString());
}

export default function PortfolioClient({
  projects,
  initialCategory,
}: {
  projects: Project[];
  initialCategory: string;
}) {
  const safeInitial: Category = categories.some((c) => c.value === initialCategory)
    ? (initialCategory as Category)
    : 'all';

  const [activeCategory, setActiveCategory] = useState<Category>(safeInitial);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            type="button"
            onClick={() => {
              setActiveCategory(cat.value);
              setUrlCategory(cat.value);
            }}
            variant={
              (cat.value === 'all' && activeCategory === 'all') ||
                activeCategory === cat.value
                ? 'default'
                : 'outline'
            }
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            لا توجد مشاريع في هذا التصنيف حالياً
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.slug}`} className="group">
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
                    {project.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-secondary rounded-md">
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > 3 && (
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
    </>
  );
}