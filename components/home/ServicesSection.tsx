import Link from 'next/link';
import { Brain, Code, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ServicesSection() {
  const services = [
    {
      icon: Brain,
      title: 'خدمات الذكاء الاصطناعي',
      description: 'تطوير نماذج تعلم آلة، معالجة لغة طبيعية، رؤية حاسوبية، وروبوتات محادثة ذكية',
      features: [
        'تطوير نماذج التعلم الآلي',
        'معالجة اللغة الطبيعية',
        'الرؤية الحاسوبية',
        'استشارات ذكاء اصطناعي',
      ],
    },
    {
      icon: Code,
      title: 'خدمات البرمجة الشاملة',
      description: 'تطوير مواقع وتطبيقات احترافية، واجهات برمجية، وحلول برمجية مخصصة',
      features: [
        'تطوير مواقع ويب متقدمة',
        'تطبيقات الجوال',
        'تصميم قواعد البيانات',
        'واجهات برمجية (APIs)',
      ],
    },
    {
      icon: GraduationCap,
      title: 'الخدمات الطلابية',
      description: 'دعم شامل للطلاب في مشاريع التخرج، الواجبات البرمجية، والتقارير التقنية',
      features: [
        'مشاريع التخرج المتكاملة',
        'حل الواجبات البرمجية',
        'إعداد التقارير التقنية',
        'شروحات ودروس خصوصية',
      ],
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">خدماتي</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            أقدم مجموعة شاملة من الخدمات البرمجية والتقنية لتلبية احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 bg-card rounded-xl border shadow-sm card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/services">
              عرض جميع الخدمات
              <ArrowLeft size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
