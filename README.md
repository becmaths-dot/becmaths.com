# Academic Documentation Portal

Personal academic file management portal using GitHub Pages + Supabase.

## Features in Version 1
- Personal Supabase login
- Academic year management
- Semesters 1–8
- Maximum 4 subjects per semester
- Subject-wise document categories
- Private file upload to Supabase Storage
- View files using temporary signed URLs
- Delete files

## Setup
1. Create the Supabase project and database/storage policies as instructed.
2. Open `app.js`.
3. Replace:
   - `PASTE_YOUR_SUPABASE_PROJECT_URL`
   - `PASTE_YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY`
4. Upload `index.html`, `style.css`, and `app.js` to GitHub.
5. Enable GitHub Pages from Settings → Pages → Deploy from branch → `main` → `/ (root)`.

Never put a Supabase `service_role` secret in this website. Only use the public publishable/anon key.
