/*
  # إنشاء جداول قاعدة بيانات موقع توهيب الصوفي الشخصي

  ## الجداول الجديدة
  
  ### 1. projects (المشاريع)
    - `id` (uuid, primary key)
    - `title_ar` (text) - عنوان المشروع بالعربية
    - `slug` (text, unique) - معرف URL فريد
    - `description_ar` (text) - وصف قصير
    - `content_ar` (text) - وصف مفصل
    - `category` (text) - التصنيف (ai, programming, student)
    - `technologies` (text[]) - قائمة التقنيات المستخدمة
    - `image_url` (text) - رابط الصورة الرئيسية
    - `images` (text[]) - روابط صور إضافية
    - `live_url` (text, nullable) - رابط المشروع الحي
    - `github_url` (text, nullable) - رابط GitHub
    - `featured` (boolean) - هل يظهر في الصفحة الرئيسية
    - `order_index` (integer) - ترتيب العرض
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ### 2. blog_posts (المقالات)
    - `id` (uuid, primary key)
    - `title_ar` (text) - عنوان المقالة
    - `slug` (text, unique) - معرف URL فريد
    - `excerpt_ar` (text) - ملخص
    - `content_ar` (text) - المحتوى الكامل
    - `image_url` (text) - صورة المقالة
    - `category` (text) - التصنيف
    - `tags` (text[]) - وسوم
    - `published` (boolean) - منشورة أم لا
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  ### 3. testimonials (شهادات العملاء)
    - `id` (uuid, primary key)
    - `client_name_ar` (text) - اسم العميل
    - `client_role_ar` (text) - صفة العميل
    - `content_ar` (text) - نص الشهادة
    - `rating` (integer) - التقييم من 5
    - `project_id` (uuid, nullable) - مرتبط بمشروع معين
    - `avatar_url` (text, nullable) - صورة العميل
    - `featured` (boolean) - هل تظهر في الصفحة الرئيسية
    - `created_at` (timestamptz)

  ### 4. services (الخدمات)
    - `id` (uuid, primary key)
    - `title_ar` (text) - عنوان الخدمة
    - `slug` (text, unique) - معرف URL فريد
    - `description_ar` (text) - وصف قصير
    - `details_ar` (text) - تفاصيل كاملة
    - `icon` (text) - اسم الأيقونة
    - `category` (text) - التصنيف الرئيسي
    - `sub_services` (jsonb) - خدمات فرعية
    - `order_index` (integer) - ترتيب العرض
    - `created_at` (timestamptz)

  ### 5. contact_messages (رسائل الاتصال)
    - `id` (uuid, primary key)
    - `name` (text) - اسم المرسل
    - `email` (text) - البريد الإلكتروني
    - `subject` (text) - الموضوع
    - `message` (text) - الرسالة
    - `read` (boolean) - مقروءة أم لا
    - `created_at` (timestamptz)

  ## الأمان
    - تفعيل RLS على جميع الجداول
    - سياسات القراءة العامة للبيانات المنشورة
    - سياسات الكتابة للمستخدمين المصادق عليهم فقط
*/

-- إنشاء جدول المشاريع
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_ar text NOT NULL,
  content_ar text NOT NULL,
  category text NOT NULL CHECK (category IN ('ai', 'programming', 'student')),
  technologies text[] DEFAULT '{}',
  image_url text NOT NULL,
  images text[] DEFAULT '{}',
  live_url text,
  github_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول المقالات
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt_ar text NOT NULL,
  content_ar text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- إنشاء جدول الشهادات
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name_ar text NOT NULL,
  client_role_ar text NOT NULL,
  content_ar text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project_id uuid REFERENCES projects(id) ON DELETE SET NULL,
  avatar_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول الخدمات
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  slug text UNIQUE NOT NULL,
  description_ar text NOT NULL,
  details_ar text NOT NULL,
  icon text NOT NULL,
  category text NOT NULL CHECK (category IN ('ai', 'programming', 'student')),
  sub_services jsonb DEFAULT '[]',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- إنشاء جدول رسائل الاتصال
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- إنشاء فهارس للأداء
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);

-- تفعيل RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- سياسات القراءة العامة
CREATE POLICY "السماح بقراءة جميع المشاريع للجميع"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "السماح بقراءة المقالات المنشورة للجميع"
  ON blog_posts FOR SELECT
  TO public
  USING (published = true);

CREATE POLICY "السماح بقراءة جميع الشهادات للجميع"
  ON testimonials FOR SELECT
  TO public
  USING (true);

CREATE POLICY "السماح بقراءة جميع الخدمات للجميع"
  ON services FOR SELECT
  TO public
  USING (true);

-- سياسات الكتابة للمشاريع (للمصادقين فقط)
CREATE POLICY "المصادقون يمكنهم إضافة مشاريع"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم تحديث المشاريع"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم حذف المشاريع"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- سياسات الكتابة للمقالات
CREATE POLICY "المصادقون يمكنهم إضافة مقالات"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم تحديث المقالات"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم حذف المقالات"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- سياسات الكتابة للشهادات
CREATE POLICY "المصادقون يمكنهم إضافة شهادات"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم تحديث الشهادات"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم حذف الشهادات"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);

-- سياسات الكتابة للخدمات
CREATE POLICY "المصادقون يمكنهم إضافة خدمات"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم تحديث الخدمات"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- سياسات رسائل الاتصال (إضافة عامة، قراءة للمصادقين)
CREATE POLICY "الجميع يمكنهم إرسال رسائل"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "المصادقون يمكنهم قراءة الرسائل"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "المصادقون يمكنهم تحديث حالة الرسائل"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
