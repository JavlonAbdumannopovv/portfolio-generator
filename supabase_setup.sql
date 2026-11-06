-- ============================================================
-- JAVLON ABDUMANNOPOV PORTFOLIO — SUPABASE MA'LUMOTLAR BAZASI
-- ============================================================
-- Ushbu SQL kodini Supabase boshqaruv panelidagi "SQL Editor"
-- bo'limiga nusxalab qo'yib, "RUN" tugmasini bosing.
-- ============================================================

-- 1. Portfolio kontentini saqlash jadvali (Loyihalar, ko'nikmalar, matnlar, tarjimalar)
CREATE TABLE IF NOT EXISTS portfolio_content (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Saytga kelgan xabarlar jadvali (Aloqa formasi orqali yuborilgan murojaatlar)
CREATE TABLE IF NOT EXISTS inquiries (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Row Level Security (RLS) xavfsizlik qoidalarini yoqish
ALTER TABLE portfolio_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 4. RLS Politsiyalari:
-- Saytga kirgan barcha odamlar portfolio ma'lumotlarini o'qiy oladi
DROP POLICY IF EXISTS "Allow public read portfolio_content" ON portfolio_content;
CREATE POLICY "Allow public read portfolio_content"
  ON portfolio_content FOR SELECT
  USING (true);

-- Admin panel orqali ma'lumotlarni saqlash va yangilash
DROP POLICY IF EXISTS "Allow public upsert portfolio_content" ON portfolio_content;
CREATE POLICY "Allow public upsert portfolio_content"
  ON portfolio_content FOR ALL
  USING (true);

-- Saytga kelgan har qanday tashrif buyuruvchi xabar qoldira oladi
DROP POLICY IF EXISTS "Allow public insert inquiries" ON inquiries;
CREATE POLICY "Allow public insert inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Xabarlarni ko'rish va o'qilgan deb belgilash
DROP POLICY IF EXISTS "Allow public select inquiries" ON inquiries;
CREATE POLICY "Allow public select inquiries"
  ON inquiries FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow public update inquiries" ON inquiries;
CREATE POLICY "Allow public update inquiries"
  ON inquiries FOR UPDATE
  USING (true);

DROP POLICY IF EXISTS "Allow public delete inquiries" ON inquiries;
CREATE POLICY "Allow public delete inquiries"
  ON inquiries FOR DELETE
  USING (true);
