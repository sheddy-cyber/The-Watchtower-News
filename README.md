# The Watchtower News — Full-Stack Application

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL + Prisma ORM |
| Auth | JWT (access + refresh tokens) + bcrypt |
| Email | Nodemailer + SMTP (e.g. SendGrid / Gmail) |
| Security | Helmet, CORS, rate limiting, CSRF, input sanitisation |

---

## Project Structure

```
watchtower-app/
├── frontend/               # React Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/     # Header, Footer, Nav, Ticker
│   │   │   ├── ui/         # Button, Modal, Toast, Badge
│   │   │   ├── article/    # ArticleCard, HeroSection, ArticleView
│   │   │   └── auth/       # AuthModal, ProtectedRoute
│   │   ├── pages/          # Home, Category, Article, Search, Profile
│   │   ├── hooks/          # useAuth, useBookmarks, useSearch, useToast
│   │   ├── context/        # AuthContext
│   │   ├── styles/         # Global CSS, variables
│   │   ├── data/           # Article seed data (static fallback)
│   │   └── lib/            # api.js (axios client)
│   └── index.html
├── backend/                # Express API
│   ├── src/
│   │   ├── routes/         # auth, articles, bookmarks, newsletter
│   │   ├── controllers/    # authController, articleController, etc.
│   │   ├── middleware/      # authMiddleware, rateLimiter, validate
│   │   ├── models/         # Prisma schema types
│   │   ├── services/       # emailService, tokenService
│   │   ├── config/         # db, env, cors
│   │   └── utils/          # sanitise, paginate, errors
│   ├── prisma/
│   │   └── schema.prisma
│   └── .env.example
└── README.md
```

---

## Quick Start

### 1. Prerequisites
- Node.js 18+
- PostgreSQL 14+ running locally (or use a cloud DB like Supabase / Neon)

### 2. Database
```bash
# Create a PostgreSQL database
createdb watchtower

# Or with psql:
psql -c "CREATE DATABASE watchtower;"
```

### 3. Backend
```bash
cd backend
cp .env.example .env
# → Fill in your DB connection string, JWT secrets, and SMTP credentials

npm install
npx prisma migrate dev --name init
npx prisma db seed        # loads sample articles
npm run dev               # starts on http://localhost:4000
```

### 4. Frontend
```bash
cd frontend
cp .env.example .env
# → Set VITE_API_URL=http://localhost:4000/api

npm install
npm run dev               # starts on http://localhost:5173
```

---

## Environment Variables

### backend/.env
```env
DATABASE_URL="postgresql://user:password@localhost:5432/watchtower"

JWT_ACCESS_SECRET="change-me-to-something-long-and-random"
JWT_REFRESH_SECRET="change-me-to-another-long-random-string"
JWT_ACCESS_EXPIRES="15m"
JWT_REFRESH_EXPIRES="7d"

SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT=587
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"
SMTP_FROM="noreply@yourwatchtower.com"
SMTP_FROM_NAME="The Watchtower"

FRONTEND_URL="http://localhost:5173"
PORT=4000
NODE_ENV="development"
```

### frontend/.env
```env
VITE_API_URL=http://localhost:4000/api
```

---

## API Endpoints

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Sign in, returns tokens |
| POST | /api/auth/logout | ✓ | Invalidate refresh token |
| POST | /api/auth/refresh | — | Rotate access token |
| GET  | /api/auth/me | ✓ | Get current user |
| POST | /api/auth/verify-email | — | Verify email token |
| POST | /api/auth/forgot-password | — | Send reset email |
| POST | /api/auth/reset-password | — | Set new password |

### Articles
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/articles | — | List articles (paginated, filterable) |
| GET | /api/articles/:id | — | Single article |
| GET | /api/articles/category/:cat | — | Articles by category |
| GET | /api/articles/trending | — | Trending articles |
| GET | /api/articles/search?q= | — | Full-text search |

### Bookmarks
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/bookmarks | ✓ | User's bookmarks |
| POST | /api/bookmarks/:id | ✓ | Add bookmark |
| DELETE | /api/bookmarks/:id | ✓ | Remove bookmark |

### Newsletter
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/newsletter/subscribe | — | Subscribe with email |
| GET  | /api/newsletter/confirm/:token | — | Confirm subscription |
| POST | /api/newsletter/unsubscribe | — | Unsubscribe |

---

## Security Features

- **Passwords** — bcrypt with 12 salt rounds
- **Tokens** — short-lived JWT access tokens (15 min) + rotating refresh tokens (7 days)
- **HTTP headers** — Helmet sets CSP, HSTS, X-Frame-Options, etc.
- **Rate limiting** — 100 req/15 min globally; 10 req/15 min on auth routes
- **CORS** — strict origin whitelist from `FRONTEND_URL`
- **Input validation** — express-validator on all mutation endpoints
- **SQL injection** — Prisma parameterised queries (no raw SQL)
- **XSS** — DOMPurify on frontend; sanitise-html on backend
- **CSRF** — SameSite=Strict cookies for refresh token
- **Email verification** — users must confirm email before full access
- **Refresh token rotation** — old refresh token invalidated on every use

---

## Deployment

### Frontend → Vercel / Netlify
```bash
cd frontend && npm run build
# Deploy the dist/ folder
```

### Backend → Railway / Render / Fly.io
```bash
# Set all env vars in your host's dashboard
# Railway auto-detects Node.js and runs npm start
```

### Database → Supabase / Neon / Railway Postgres
```
Copy the connection string into DATABASE_URL
```
