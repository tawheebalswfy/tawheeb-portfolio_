import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Download, Code, Brain, Rocket, Target } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'عني - ' + SITE_CONFIG.name,
  description: 'تعرف على توهيب الصوفي، مبرمج ومطور ويب بخبرة في تطوير الحلول البرمجية وتطبيقات الذكاء الاصطناعي',
};

export default function AboutPage() {
  const skills = [
    { name: 'Next.js', level: 95 },
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 90 },
    { name: 'Python', level: 95 },
    { name: 'TensorFlow', level: 85 },
    { name: 'PostgreSQL', level: 90 },
    { name: 'MongoDB', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Docker', level: 80 },
  ];

  const values = [
    {
      icon: Code,
      title: 'جودة الكود',
      description: 'أكتب كود نظيف ومنظم وقابل للصيانة مع أفضل الممارسات',
    },
    {
      icon: Brain,
      title: 'حلول مبتكرة',
      description: 'أبحث دائماً عن أفضل الحلول التقنية المناسبة لكل مشروع',
    },
    {
      icon: Rocket,
      title: 'الالتزام بالمواعيد',
      description: 'أحترم المواعيد المتفق عليها وأسلم المشاريع في الوقت المحدد',
    },
    {
      icon: Target,
      title: 'التركيز على النتائج',
      description: 'أهتم بتحقيق أهدافك وضمان نجاح مشروعك',
    },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="order-2 lg:order-1">
                <h1 className="mb-6">من أنا</h1>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    مرحباً! أنا <strong className="text-foreground">توهيب الصوفي</strong>،
                    مبرمج ومطور ويب متكامل بخبرة واسعة في تطوير الحلول البرمجية وتطبيقات الذكاء الاصطناعي.
                  </p>
                  <p>
                    بدأت رحلتي في عالم البرمجة منذ أكثر من 5 سنوات، وخلال هذه الفترة عملت على مجموعة متنوعة
                    من المشاريع التي شملت تطوير مواقع وتطبيقات الويب، تطبيقات الجوال، نماذج الذكاء الاصطناعي،
                    ومشاريع التخرج الجامعية.
                  </p>
                  <p>
                    أؤمن بأن التكنولوجيا يجب أن تكون في خدمة الإنسان، ولذلك أسعى دائماً لتقديم حلول عملية
                    ومبتكرة تساعد الشركات على النمو وتدعم الطلاب في مسيرتهم الأكاديمية.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5">
                  <Image
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                    alt="توهيب الصوفي"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="p-6 bg-card rounded-xl border shadow-sm text-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mb-16">
              <h2 className="text-center mb-12">المهارات التقنية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="mb-4">هل تريد معرفة المزيد؟</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                يمكنك تحميل سيرتي الذاتية الكاملة أو التواصل معي مباشرة لمناقشة مشروعك
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Download size={20} />
                  تحميل السيرة الذاتية (PDF)
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">تواصل معي</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
