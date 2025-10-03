-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS "categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "slug" text UNIQUE NOT NULL,
  "color" text DEFAULT '#ef2b70',
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Posts table
CREATE TABLE IF NOT EXISTS "posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "owner_id" text DEFAULT auth.user_id() NOT NULL,
  "title" text NOT NULL,
  "slug" text UNIQUE NOT NULL,
  "excerpt" text,
  "content" text NOT NULL,
  "category_id" uuid,
  "featured_image" text,
  "status" text DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  "views" integer DEFAULT 0,
  "tags" text[],
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE "posts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "categories" ENABLE ROW LEVEL SECURITY;

-- Foreign key
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" 
  FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Indexes
CREATE INDEX IF NOT EXISTS "posts_owner_idx" ON "posts" USING btree ("owner_id");
CREATE INDEX IF NOT EXISTS "posts_category_idx" ON "posts" USING btree ("category_id");
CREATE INDEX IF NOT EXISTS "posts_status_idx" ON "posts" USING btree ("status");
CREATE INDEX IF NOT EXISTS "posts_slug_idx" ON "posts" USING btree ("slug");

-- RLS Policies for Posts
CREATE POLICY "posts_select_policy" ON "posts" 
  AS PERMISSIVE FOR SELECT TO "authenticated" 
  USING (auth.user_id() = "posts"."owner_id" OR "posts"."status" = 'published');

CREATE POLICY "posts_insert_policy" ON "posts" 
  AS PERMISSIVE FOR INSERT TO "authenticated" 
  WITH CHECK (auth.user_id() = "posts"."owner_id");

CREATE POLICY "posts_update_policy" ON "posts" 
  AS PERMISSIVE FOR UPDATE TO "authenticated" 
  USING (auth.user_id() = "posts"."owner_id") 
  WITH CHECK (auth.user_id() = "posts"."owner_id");

CREATE POLICY "posts_delete_policy" ON "posts" 
  AS PERMISSIVE FOR DELETE TO "authenticated" 
  USING (auth.user_id() = "posts"."owner_id");

-- RLS Policies for Categories (all authenticated users can read)
CREATE POLICY "categories_select_policy" ON "categories" 
  AS PERMISSIVE FOR SELECT TO "authenticated" 
  USING (true);

CREATE POLICY "categories_insert_policy" ON "categories" 
  AS PERMISSIVE FOR INSERT TO "authenticated" 
  WITH CHECK (true);

CREATE POLICY "categories_update_policy" ON "categories" 
  AS PERMISSIVE FOR UPDATE TO "authenticated" 
  USING (true);

CREATE POLICY "categories_delete_policy" ON "categories" 
  AS PERMISSIVE FOR DELETE TO "authenticated" 
  USING (true);

-- Insert default categories
INSERT INTO "categories" ("name", "slug", "color") VALUES
  ('Platforms', 'platforms', '#ef2b70'),
  ('Guides', 'guides', '#22c55e'),
  ('Comparisons', 'comparisons', '#1e1541'),
  ('Career', 'career', '#3b82f6'),
  ('Business', 'business', '#f59e0b')
ON CONFLICT (slug) DO NOTHING;

-- Grant permissions to authenticated users
GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, UPDATE, INSERT, DELETE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO authenticated;

-- Grant read permissions to anonymous users
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anonymous;
GRANT USAGE ON SCHEMA public TO authenticated, anonymous;
