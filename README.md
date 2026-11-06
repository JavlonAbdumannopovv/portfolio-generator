# Javlon Abdumannopov — Portfolio & IT Mentorship Hub

Frontend React dasturchi va IT mentor (Geeks Andijan) Javlon Abdumannopovning shaxsiy portfoliova mentorlik veb-ilovasi.

## 🚀 Texnologik Stek
- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite, Lucide Icons, Canvas Confetti
- **Markaziy Baza (CMS):** Supabase (PostgreSQL Cloud) + LocalStorage Fallback
- **Hosting:** Vercel (SPA Rewrites qo'llab-quvvatlangan)
- **Dizayn:** Glassmorphism, Cursor Smoke / Glow Trail, Ikki tomonlama Scroll Reveal animatsiyalari
- **Ko'p tillilik:** O'zbekcha (UZ), Ruscha (RU), Inglizcha (EN)

---

## 🛠️ Lokal ishga tushirish (Local Development)

```bash
# 1. Bog'liqliklarni o'rnatish
npm install

# 2. Serverni ishga tushirish
npm run dev

# 3. Loyihani tekshirish uchun brauzerda oching:
# http://localhost:5173
# Admin panel: http://localhost:5173/#admin (yoki /admin)
```

---

## 🌐 Supabase Markaziy Bazani Ulash (3 qadamda)

1. [supabase.com](https://supabase.com) saytida bepul yangi loyiha oching.
2. Loyihadagi `supabase_setup.sql` fayli kodini Supabase SQL Editor bo'limiga tashlab, **"RUN"** tugmasini bosing.
3. Supabase **Project Settings -> API** bo'limidagi URL va `anon` kalitini `.env` fayliga kiriting:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 🚢 Vercel'da Deploy Qilish

1. Kodlarni GitHub repozitoriyangizga push qiling:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio & global admin CMS"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) da "Add New Project" -> GitHub repozitoriyni tanlang.
3. **Environment Variables** bo'limida:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   kalitlarini qo'shing.
4. **"Deploy"** tugmasini bosing!
