# SupportIQ

AI-powered customer support ticket triage and automation platform.

## Project Structure

```text
SUPPORTIQ/
├── frontend/
├── backend/
└── README.md
```

## Stack

- Frontend: Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, Axios, React Hook Form, Zod, Lucide React
- Backend: Node.js, Express.js, TypeScript, Prisma ORM
- Database: PostgreSQL

## Foundation Files

- `frontend/src/app/page.tsx` renders the Day 1 homepage and checks backend health.
- `frontend/src/lib/api.ts` exports the Axios instance.
- `frontend/src/components/ui/card.tsx` provides the shadcn-style Card used on the homepage.
- `backend/src/routes/health.routes.ts` exposes `GET /api/health`.
- `backend/src/config/prisma.ts` exports the Prisma singleton.
- `backend/prisma/schema.prisma` contains the PostgreSQL datasource and `User` model.

## Environment Variables

`backend/.env`

```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/supportiq"
```

`frontend/.env.local` when needed:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

## Installation Commands

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Prisma Commands

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

## Run Commands

```bash
cd backend
npm run dev

cd ../frontend
npm run dev
```

## Day 1 Status

✅ Frontend Running

✅ Backend Running

✅ PostgreSQL Connected

✅ Prisma Connected

✅ Frontend ↔ Backend Connected
