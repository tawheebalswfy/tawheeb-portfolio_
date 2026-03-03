import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (supabase) {
    return supabase;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment.');
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
}

export type Project = {
  id: string;
  title_ar: string;
  slug: string;
  description_ar: string;
  content_ar: string;
  category: 'ai' | 'programming' | 'student';
  technologies: string[];
  image_url: string;
  images: string[];
  live_url?: string;
  github_url?: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title_ar: string;
  slug: string;
  excerpt_ar: string;
  content_ar: string;
  image_url: string;
  category: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  client_name_ar: string;
  client_role_ar: string;
  content_ar: string;
  rating: number;
  project_id?: string;
  avatar_url?: string;
  featured: boolean;
  created_at: string;
};

export type Service = {
  id: string;
  title_ar: string;
  slug: string;
  description_ar: string;
  details_ar: string;
  icon: string;
  category: 'ai' | 'programming' | 'student';
  sub_services: string[];
  order_index: number;
  created_at: string;
};

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
