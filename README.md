# موقع توهيب الصوفي الشخصي

موقع ويب شخصي احترافي باللغة العربية يعرض خدمات ومشاريع المبرمج توهيب الصوفي في مجالات الذكاء الاصطناعي والبرمجة والخدمات الطلابية.

## المميزات الرئيسية

✅ **تصميم عصري وجذاب** - تصميم متجاوب بالكامل مع دعم RTL
✅ **Next.js 13+ مع App Router** - أحدث تقنيات Next.js
✅ **Tailwind CSS** - تنسيقات مرنة وقابلة للتخصيص
✅ **Supabase** - قاعدة بيانات PostgreSQL مع دعم RLS
✅ **خط Cairo** - خط عربي احترافي من Google Fonts
✅ **SEO محسّن** - ميتاداتا ديناميكية، sitemap، robots.txt، JSON-LD
✅ **صفحات ديناميكية** - مشاريع ومقالات مدونة ديناميكية
✅ **نموذج اتصال** - نموذج تواصل عامل مع حفظ الرسائل في قاعدة البيانات
✅ **دعم RTL كامل** - تخطيط من اليمين لليسار

## هيكل المشروع

```
├── app/
│   ├── about/          # صفحة "عني"
│   ├── services/       # صفحة الخدمات
│   ├── portfolio/      # صفحة المشاريع + صفحات ديناميكية
│   ├── blog/           # صفحة المدونة + صفحات ديناميكية
│   ├── contact/        # صفحة التواصل
│   ├── api/            # API Routes
│   ├── layout.tsx      # Layout رئيسي
│   ├── page.tsx        # الصفحة الرئيسية
│   ├── sitemap.ts      # Sitemap ديناميكي
│   └── robots.ts       # ملف Robots
├── components/
│   ├── layout/         # Header, Footer
│   ├── home/           # مكونات الصفحة الرئيسية
│   └── ui/             # مكونات Shadcn/ui
├── lib/
│   ├── supabase.ts     # إعداد Supabase
│   ├── constants.ts    # الثوابت
│   └── json-ld.ts      # مخططات JSON-LD
└── public/             # ملفات ثابتة
```

## متطلبات البدء

- Node.js 18+ و npm/yarn/pnpm
- حساب Supabase (مجاني)
- محرر نصوص (VS Code مُوصى به)

## خطوات الإعداد

### 1. نسخ المشروع

```bash
git clone <repository-url>
cd project
npm install
```

### 2. إعداد Supabase

1. **إنشاء مشروع جديد على Supabase:**
   - اذهب إلى [supabase.com](https://supabase.com)
   - أنشئ حساب جديد أو سجّل الدخول
   - أنشئ مشروع جديد

2. **الحصول على بيانات الاتصال:**
   - من لوحة التحكم، اذهب إلى Settings > API
   - انسخ `Project URL` و `anon public key`

3. **قاعدة البيانات قد تم إنشاؤها بالفعل!**
   - الجداول والبيانات الأولية تم إنشاؤها تلقائياً
   - يمكنك مشاهدة الجداول من Table Editor في Supabase

### 3. إعداد متغيرات البيئة

انسخ ملف `.env.example` إلى `.env.local`:

```bash
cp .env.example .env.local
```

عدّل الملف `.env.local` وأضف بيانات Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=توهيب الصوفي - مبرمج ومطور ويب
NEXT_PUBLIC_CONTACT_EMAIL=tawheebalswfy@gmail.com
NEXT_PUBLIC_WHATSAPP_NUMBER=00966537716904
```

### 4. تشغيل المشروع محلياً

```bash
npm run dev
```

افتح المتصفح على [http://localhost:3000](http://localhost:3000)

## إدارة المحتوى

### إضافة مشاريع جديدة

1. افتح لوحة تحكم Supabase
2. اذهب إلى Table Editor > projects
3. اضغط على "Insert row" وأضف البيانات:
   - `title_ar`: عنوان المشروع بالعربية
   - `slug`: معرف URL فريد (مثال: `my-project`)
   - `description_ar`: وصف قصير
   - `content_ar`: وصف مفصل
   - `category`: التصنيف (`ai` أو `programming` أو `student`)
   - `technologies`: قائمة التقنيات (Array)
   - `image_url`: رابط الصورة الرئيسية
   - `featured`: اجعله `true` ليظهر في الصفحة الرئيسية

### إضافة مقالات جديدة

1. اذهب إلى Table Editor > blog_posts
2. أضف مقالة جديدة بنفس الطريقة السابقة
3. اجعل `published` = `true` لنشر المقالة

### إضافة أو تعديل الخدمات

1. اذهب إلى Table Editor > services
2. عدّل الخدمات الموجودة أو أضف خدمات جديدة

### عرض رسائل الاتصال

1. اذهب إلى Table Editor > contact_messages
2. ستجد جميع الرسائل المُرسلة من نموذج التواصل

## النشر على Vercel

### خطوات النشر:

1. **رفع المشروع على GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **الربط مع Vercel:**
   - اذهب إلى [vercel.com](https://vercel.com)
   - سجّل الدخول باستخدام GitHub
   - اضغط "New Project"
   - اختر المستودع
   - أضف متغيرات البيئة (Environment Variables):
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `NEXT_PUBLIC_SITE_URL` (استخدم رابط Vercel)
     - بقية المتغيرات من ملف `.env.local`

3. **انشر المشروع:**
   - اضغط "Deploy"
   - انتظر حتى تكتمل العملية
   - ستحصل على رابط مباشر للموقع!

## التخصيص

### تغيير المعلومات الشخصية

عدّل ملف `lib/constants.ts`:

```typescript
export const SITE_CONFIG = {
  name: 'اسمك',
  email: 'بريدك@example.com',
  whatsapp: 'رقم واتساب',
  // ... بقية الإعدادات
};
```

### تغيير الألوان

عدّل ملف `app/globals.css` - القسم الخاص بـ CSS Variables:

```css
:root {
  --primary: 0 72% 51%; /* اللون الأساسي */
  /* ... */
}
```

### إضافة أو تعديل الصفحات

- الصفحات موجودة في مجلد `app/`
- لإضافة صفحة جديدة، أنشئ مجلد جديد مع ملف `page.tsx`

## بنية قاعدة البيانات

### الجداول الرئيسية:

1. **projects** - المشاريع
2. **blog_posts** - مقالات المدونة
3. **services** - الخدمات
4. **testimonials** - آراء العملاء
5. **contact_messages** - رسائل التواصل

جميع الجداول محمية بـ Row Level Security (RLS):
- القراءة متاحة للجميع
- الكتابة/التعديل/الحذف للمستخدمين المصادقين فقط

## الدعم الفني

للمساعدة أو الاستفسارات:
- البريد الإلكتروني: tawheebalswfy@gmail.com
- واتساب: 00966537716904

## الترخيص

هذا المشروع مُصمم خصيصاً لـ **توهيب الصوفي**. جميع الحقوق محفوظة © 2024

---

تم بناء المشروع باستخدام ❤️ و Next.js 13 + Tailwind CSS + Supabase
