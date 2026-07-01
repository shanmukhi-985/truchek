# TruChek — Think. Check. Trust.

> AI-powered fact-checking platform with a production-ready authentication module.

---

## Project Overview

TruChek is a premium fact-verification platform built with React, TypeScript, Vite, and Tailwind CSS. Phase 2 delivers a complete authentication system with premium glassmorphism UI, Framer Motion animations, and a secure JWT-based auth flow.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Routing | React Router DOM v7 |
| State | TanStack Query + Context API |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Auth | JWT (Access + Refresh tokens) |
| Backend | FastAPI (see backend/) |
| Database | PostgreSQL + SQLAlchemy |
| Migrations | Alembic |

---

## Authentication Flow

```
Signup ──► Email Verification ──► Login ──► JWT Access Token
                                              │
                                              ▼
                                    Protected Routes
                                              │
                                    ┌─────────┴─────────┐
                                    │   Access Expired   │
                                    │                    ▼
                                    │          Refresh Token
                                    │                    │
                                    │              ┌─────┴──────┐
                                    │              │ Valid       │ Invalid
                                    │              ▼             ▼
                                    │         New Token    Session Expired
                                    │              │
                                    └─────────────►┘
                                              │
                                            Logout
                                              │
                                          Clear Storage
```

---

## Authentication Pages

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Email/password + social login UI |
| `/signup` | Sign Up | Registration with password strength |
| `/forgot-password` | Forgot Password | Email submission + success state |
| `/reset-password?token=` | Reset Password | New password + confirm |
| `/verify-email?token=` | Verify Email | Token-based email verification |
| `/verify-email/success` | Verification Success | Welcome screen |
| `/session-expired` | Session Expired | Re-authentication prompt |
| `/unauthorized` | Unauthorized | 403 error page |

---

## API Endpoints

### Backend (FastAPI)

```
POST   /api/v1/auth/register          Register new user
POST   /api/v1/auth/login             Login with email/password
POST   /api/v1/auth/logout            Logout (invalidate refresh token)
POST   /api/v1/auth/refresh           Refresh access token
POST   /api/v1/auth/forgot-password   Send password reset email
POST   /api/v1/auth/reset-password    Reset password with token
POST   /api/v1/auth/verify-email      Verify email with token
GET    /api/v1/auth/me                Get current user profile
```

### Request Examples

```json
// POST /auth/register
{
  "full_name": "Alex Johnson",
  "email": "alex@example.com",
  "password": "MySecure@Pass1"
}

// POST /auth/login
{
  "email": "alex@example.com",
  "password": "MySecure@Pass1",
  "remember_me": true
}

// POST /auth/reset-password
{
  "token": "eyJhbGc...",
  "password": "NewSecure@Pass1"
}
```

---

## Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/truchek_db

# JWT
JWT_SECRET_KEY=your-super-secret-key-min-32-chars
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=15
REFRESH_TOKEN_EXPIRE_DAYS=7

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@truchek.io

# App
APP_URL=http://localhost:5173
SECRET_KEY=another-secret-key-for-csrf
```

---

## Security

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcrypt (12 rounds) |
| Access Token | JWT (15 min expiry) |
| Refresh Token | Secure HttpOnly cookie (7 days) |
| Email Verification | Time-limited token (24hr) |
| Password Reset | Time-limited token (1hr) |
| Input Validation | Zod (frontend) + Pydantic (backend) |
| Error Handling | Standardized API errors |
| CORS | Configurable origin whitelist |

---

## Password Requirements

- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

---

## User Database Schema

```sql
users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  avatar        VARCHAR(500),
  role          VARCHAR(20) DEFAULT 'user',  -- user | admin | moderator
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  last_login    TIMESTAMPTZ
)
```

---

## Project Structure

```
src/
├── components/
│   └── auth/
│       ├── AuthAlert.tsx          # Error/success alerts
│       ├── AuthButton.tsx         # Primary/secondary buttons
│       ├── AuthCard.tsx           # Glassmorphism card wrapper
│       ├── AuthDivider.tsx        # "or" divider
│       ├── AuthLayout.tsx         # Two-panel layout with illustration
│       ├── FormInput.tsx          # Text input with icon + error
│       ├── PasswordInput.tsx      # Password with show/hide toggle
│       ├── PasswordStrength.tsx   # Strength indicator + requirements
│       ├── ProtectedRoute.tsx     # Auth guard + guest guard
│       └── SocialLoginButton.tsx  # Google/GitHub social buttons
├── contexts/
│   └── AuthContext.tsx            # Auth state + actions provider
├── lib/
│   ├── api/
│   │   ├── auth.service.ts        # Real + mock auth service
│   │   └── client.ts              # HTTP client with token refresh
│   ├── constants.ts               # App-wide constants
│   └── validations/
│       └── auth.ts                # Zod schemas + password strength
├── pages/
│   ├── auth/
│   │   ├── AuthLoadingScreen.tsx  # Init loading screen
│   │   ├── ForgotPasswordPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── ResetPasswordPage.tsx
│   │   ├── SessionExpiredPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── UnauthorizedPage.tsx
│   │   ├── VerifyEmailPage.tsx
│   │   └── VerifyEmailSuccessPage.tsx
│   └── DashboardPage.tsx          # Protected dashboard demo
├── router/
│   └── index.tsx                  # React Router v7 routes
├── types/
│   └── auth.ts                    # TypeScript interfaces
├── utils/
│   └── cn.ts                      # Tailwind class merger
├── App.tsx                        # Root component with providers
├── index.css                      # Global styles
└── main.tsx                       # React entry point
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Demo Mode

The frontend runs in **mock mode** by default (`USE_MOCK = true` in `auth.service.ts`).

Test credentials:
- **Email**: any valid email
- **Password**: any password (use `wrongpassword` to test error state)
- **Duplicate email**: `test@example.com` or `admin@truchek.io`

Switch to real backend by setting `USE_MOCK = false` in `src/lib/api/auth.service.ts`.

---

## Phase Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | ✅ Complete | Foundation, routing, theme, providers |
| Phase 2 | ✅ Complete | Authentication module |
| Phase 3 | 🔜 Planned | Fact-checking engine, AI integration |
| Phase 4 | 🔜 Planned | Analytics, reports, teams |

---

*TruChek — Think. Check. Trust.*
