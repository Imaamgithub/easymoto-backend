# EasyMoto Backend — quick start

Prerequisites
- Node.js
- PostgreSQL (or a hosted PostgreSQL) and a valid `DATABASE_URL` in `.env`

Quick steps

1. Install deps
```bash
npm install
```

2. Generate Prisma client
```bash
npx prisma generate
```

3. Apply migration (creates DB tables)
```bash
npx prisma migrate dev --name init
```

4. Build and start
```bash
rm -rf dist
npm run build
npm start
```

API
- `GET /` — root
- `GET /orders` — list orders
- `POST /orders` — create order
- `GET /riders` — list riders
- `POST /riders` — create rider
# easymoto-backend