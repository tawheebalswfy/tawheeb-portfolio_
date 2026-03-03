-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description_ar TEXT NOT NULL,
  content_ar TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('ai', 'programming', 'student')),
  technologies TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL DEFAULT '',
  images TEXT[] NOT NULL DEFAULT '{}',
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name_ar TEXT NOT NULL,
  client_role_ar TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  avatar_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt_ar TEXT NOT NULL DEFAULT '',
  content_ar TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description_ar TEXT NOT NULL DEFAULT '',
  details_ar TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Code',
  category TEXT NOT NULL CHECK (category IN ('ai', 'programming', 'student')),
  sub_services TEXT[] NOT NULL DEFAULT '{}',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access for projects, testimonials, blog_posts, services
CREATE POLICY "Allow public read access on projects" ON public.projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on blog_posts" ON public.blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on services" ON public.services
  FOR SELECT USING (true);

-- Allow public insert access for contact_messages (so visitors can submit contact forms)
CREATE POLICY "Allow public insert on contact_messages" ON public.contact_messages
  FOR INSERT WITH CHECK (true);
