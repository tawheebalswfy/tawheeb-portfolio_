import { Star } from 'lucide-react';
import { supabase, type Testimonial } from '@/lib/supabase';

async function getFeaturedTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data as Testimonial[];
}

export default async function TestimonialsSection() {
  const testimonials = await getFeaturedTestimonials();

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">آراء العملاء</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ما يقوله عملائي عن جودة العمل والخدمات المقدمة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 bg-card rounded-xl border shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content_ar}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold">{testimonial.client_name_ar}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.client_role_ar}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
