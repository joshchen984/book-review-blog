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
## Deploy

* Deployed on Vercel
* Domain managed by Netlify
* Database hosted on MongoDB Atlas
```
npm run build
npm run preview
```
