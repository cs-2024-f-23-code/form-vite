# Backend project

Start this server before the Vite frontend:

```powershell
cd E:\vite\backend-project
npm run dev
```

It provides `POST /api/signup` and `POST /api/login` on port 3000. Vite proxies the frontend's `/api` requests to this server. Development accounts are stored in `users.json`, which is intentionally ignored by Git.
