'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageCircle, Send } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export default function ContactPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'تم إرسال الرسالة بنجاح',
          description: 'سنتواصل معك في أقرب وقت ممكن',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: 'حدث خطأ',
        description: 'لم نتمكن من إرسال رسالتك. يرجى المحاولة مرة أخرى',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="section-padding bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom text-center">
            <h1 className="mb-6">تواصل معي</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              هل لديك مشروع أو استفسار؟ لا تتردد في التواصل معي
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">معلومات الاتصال</h2>
                  <div className="space-y-4">
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                        <p className="text-sm text-muted-foreground break-all">
                          {SITE_CONFIG.email}
                        </p>
                      </div>
                    </a>

                    <a
                      href={SITE_CONFIG.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">واتساب</h3>
                        <p className="text-sm text-muted-foreground">
                          {SITE_CONFIG.whatsapp}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-4 rounded-lg bg-accent/50">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">وقت الاستجابة</h3>
                        <p className="text-sm text-muted-foreground">
                          نرد خلال 24 ساعة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl">
                  <h3 className="font-bold mb-2">تواصل سريع</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    للحصول على رد فوري، تواصل معي عبر واتساب
                  </p>
                  <Button asChild className="w-full">
                    <a
                      href={SITE_CONFIG.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      <MessageCircle size={20} />
                      راسلني على واتساب
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border shadow-sm p-8">
                  <h2 className="text-2xl font-bold mb-6">أرسل رسالة</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-2"
                        >
                          الاسم *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسمك"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-2"
                        >
                          البريد الإلكتروني *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-2"
                      >
                        الموضوع *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="موضوع الرسالة"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-2"
                      >
                        الرسالة *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="اكتب رسالتك هنا..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        'جاري الإرسال...'
                      ) : (
                        <>
                          <Send size={20} />
                          إرسال الرسالة
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
