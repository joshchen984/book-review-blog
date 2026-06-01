# Book Review Blog

* Deployed at [blog.joshchen984.com](https://blog.joshchen984.com)

Created using SvelteKit and TailwindCSS

Admin route is /admin and login route is /admin/login

## Development

Create .env file in root
```
MONGO_CONNECTION_URL=
GOOGLE_BOOKS_API_KEY=
ADMIN_PASSWORD=
ADMIN_TOKEN=
```

Set ADMIN_TOKEN to a random string.

If types aren't updated run
```
npm run check
```
## Analytics

GA4 is enabled in production only (not in local dev). Admin routes (`/admin/**`) are excluded from tracking.

Events tracked:
- `page_view` — SPA route changes on public pages
- `post_view` — individual post pages (`post_slug`, `post_title`)
- `newsletter_modal_open` — newsletter modal opened (`source_page`)
- `newsletter_subscribe` — successful newsletter signup (`source_page`)

In GA Admin, register custom dimensions for `post_slug`, `post_title`, and `source_page`, then mark `newsletter_subscribe` as a conversion.

## Deploy

* Deployed on Vercel
* Domain managed by Netlify
* Database hosted on MongoDB Atlas
```
npm run build
npm run preview
```
