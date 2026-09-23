# Atlas Analytica — Supabase Admin CMS

This version connects the admin panel and public frontend to Supabase.

## Files
- `index.html` — public homepage, now reads published articles from Supabase.
- `article.html` — public article page, reads the selected published article from Supabase.
- `admin.html` — password login + article management.
- `supabase-config.js` — your Supabase project URL + publishable/anon key.
- `supabase-schema.sql` — database, RLS, admin, and Storage setup.

## Setup
1. Create a Supabase project.
2. In Supabase SQL Editor, run `supabase-schema.sql`.
3. In Authentication > Users, create the admin email/password account.
4. Copy that Auth user's UUID.
5. Run the final `insert into public.admin_users ...` statement in `supabase-schema.sql` with the real UUID.
6. Edit `supabase-config.js` and replace the two placeholders with your Supabase project URL and publishable/anon key.
7. Serve the folder from a web server (not `file://`) and open `admin.html`.
8. Sign in and create an article. The image is uploaded to Supabase Storage and the article row is saved in Postgres.
9. Open `index.html`: only published articles appear. The article link opens `article.html?id=...`.

## Security
The browser uses only the Supabase publishable/anon key. Do NOT put a service_role/secret key in `supabase-config.js`.
RLS policies restrict article writes and Storage uploads to users listed in `public.admin_users`.


## Important browser fix
The Supabase CDN exposes a global `window.supabase`. The public pages now use
`atlasSupabase` for the created client, avoiding the browser's
`Identifier 'supabase' has already been declared` error. The homepage also has
a loader safety fallback so a JavaScript error cannot leave the loading screen
visible indefinitely.
