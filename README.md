# Socrate Bank

A simple, responsive bank website: Home, About, Login, Register, and a protected Dashboard.
Built with React + Vite, react-router-dom, and Supabase for authentication.

## 1. Install

```bash
npm install
```

## 2. Connect Supabase

1. Create a project at https://supabase.com.
2. In your Supabase project: **Project Settings → API**, copy the **Project URL** and **anon public key**.
3. Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. In Supabase, under **Authentication → Providers**, make sure **Email** is enabled.
   (If you don't want to require email confirmation while testing, turn off "Confirm email" under
   **Authentication → Settings**.)

## 3. Run locally

```bash
npm run dev
```

Visit the URL Vite prints (usually http://localhost:5173).

## 4. Deploy to Vercel

1. Push this project to a GitHub repo.
2. Import the repo in Vercel.
3. Framework preset: **Vite**.
4. Add the same two environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) in
   **Vercel → Project Settings → Environment Variables**.
5. Deploy.

## Pages

- **/** – Home / landing page
- **/about** – About Socrate Bank
- **/login** – Log in
- **/register** – Create an account
- **/dashboard** – Protected page (redirects to `/login` if not signed in); shows sample account
  and transaction data so the layout is easy to see. Swap the mock data in `src/pages/Dashboard.jsx`
  for real Supabase table queries whenever you're ready.

## Notes

- All auth logic lives in `src/context/AuthContext.jsx` (`register`, `login`, `logout`).
- Routing/protection lives in `src/components/ProtectedRoute.jsx`.
- Styling is a single global stylesheet at `src/index.css`, built mobile-first with a few
  breakpoints for tablet/desktop — no UI framework required.
