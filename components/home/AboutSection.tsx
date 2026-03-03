import { Code, Brain, GraduationCap, Award } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: Brain,
      title: 'خبرة في الذكاء الاصطناعي',
      description: 'تطوير نماذج تعلم آلي ومعالجة لغة طبيعية',
    },
    {
      icon: Code,
      title: 'برمجة احترافية',
      description: 'تطوير مواقع وتطبيقات بأحدث التقنيات',
    },
    {
      icon: GraduationCap,
      title: 'دعم الطلاب',
      description: 'مساعدة في المشاريع والواجبات البرمجية',
    },
    {
      icon: Award,
      title: 'جودة عالية',
      description: 'التزام بالمواعيد وضمان رضا العملاء',
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4">من أنا</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            أنا <strong>توهيب الصوفي</strong>، مبرمج ومطور ويب بخبرة واسعة في تطوير الحلول البرمجية المتكاملة وتطبيقات الذكاء الاصطناعي.
            أسعى لمساعدة الشركات والطلاب على تحقيق أهدافهم التقنية من خلال حلول مبتكرة وفعالة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
