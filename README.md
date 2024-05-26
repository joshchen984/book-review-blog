# Book Review Blog

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

```
npm run build
npm run preview
```
