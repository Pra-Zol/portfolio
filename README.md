# Prajwal Khanal — Portfolio Website

A modern full-stack developer portfolio built with React, Node.js, Express, and PostgreSQL.
Navy & Gold theme | Dark/Light mode | Fully responsive | Working contact form.

---

## Folder Structure

```
portfolio/
├── frontend/                        # React app
│   ├── public/index.html            # SEO-optimised HTML
│   └── src/
│       ├── components/              # All page sections
│       │   ├── Navbar.js/css        # Sticky nav + theme toggle
│       │   ├── Hero.js/css          # Canvas particles + typing animation
│       │   ├── About.js/css         # Bio + highlight cards
│       │   ├── Skills.js/css        # Animated skill bars + tech pills
│       │   ├── Projects.js/css      # Filterable project cards
│       │   ├── Experience.js/css    # Timeline — OLC Care + Anglicare
│       │   ├── Education.js/css     # Bachelor of IT
│       │   ├── Certifications.js/css
│       │   ├── Contact.js/css       # Form with validation + API
│       │   ├── Footer.js/css
│       │   └── ScrollToTop.js/css
│       ├── context/ThemeContext.js  # Dark/light mode
│       ├── App.js + App.css         # Root + global styles
│       └── index.js
│
└── backend/                         # Node.js + Express API
    ├── config/
    │   ├── db.js                    # PostgreSQL pool connection
    │   └── setup.sql                # Run once to create table
    ├── controllers/contactController.js
    ├── routes/contact.js
    └── server.js
```

---

## Quick Start

### Prerequisites
- Node.js v18+  →  https://nodejs.org
- PostgreSQL (local OR free cloud — see options below)

---

### Step 1 — Get PostgreSQL (pick one option)

#### Option A — Neon (FREE cloud, no install, RECOMMENDED)
1. Go to https://neon.tech and sign up free
2. Create a new project (takes 30 seconds)
3. Copy your connection string — looks like:
   `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`
4. In `backend/config/db.js`, uncomment the SSL line:
   `ssl: { rejectUnauthorized: false }`

#### Option B — Supabase (FREE cloud alternative)
1. Go to https://supabase.com and sign up free
2. Create a project
3. Go to Settings → Database → Connection string (URI format)
4. Enable SSL same as above

#### Option C — Local PostgreSQL
```bash
# macOS
brew install postgresql && brew services start postgresql

# Ubuntu/Debian
sudo apt install postgresql && sudo systemctl start postgresql

# Windows — download installer from https://postgresql.org/download/windows

# Then create your database:
psql -U postgres -c "CREATE DATABASE portfolio_db;"
```

---

### Step 2 — Create the Table

```bash
# Local PostgreSQL:
psql -U postgres -d portfolio_db -f backend/config/setup.sql

# Or paste the SQL into your cloud provider's SQL editor (Neon / Supabase both have one)
```

The SQL file creates this table:
```sql
CREATE TABLE contact_messages (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(200) NOT NULL,
  message    TEXT         NOT NULL,
  ip_address VARCHAR(45)  DEFAULT 'unknown',
  is_read    BOOLEAN      DEFAULT FALSE,
  created_at TIMESTAMP    DEFAULT NOW()
);
```

---

### Step 3 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — paste your DATABASE_URL
npm run dev
# Running on http://localhost:5000
```

Test it: open http://localhost:5000/api/health

---

### Step 4 — Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
cp .env.example .env
npm start
# Opens http://localhost:3000
```

---

## Add Your Photo & CV

**Profile Photo:**
1. Save your photo as `profile.jpg` (400x500px recommended)
2. Put it in `frontend/public/profile.jpg`
3. In `Hero.js` replace the placeholder div with:
```jsx
<img src="/profile.jpg" alt="Prajwal Khanal"
     style={{ width:'100%', height:'100%', objectFit:'cover' }} />
```

**CV / Resume:**
1. Export as `cv.pdf`
2. Put it in `frontend/public/cv.pdf`
3. Download buttons are already wired up!

---

## Email Notifications (Optional)

Get an email every time someone submits the contact form:

1. Enable 2FA on Gmail
2. Go to: Google Account → Security → App Passwords
3. Generate password for "Mail"
4. Add to `backend/.env`:
```
SMTP_USER=off.pklm10@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

---

## View Your Contact Messages

**Option A — SQL query:**
```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

**Option B — API (admin-protected):**
```bash
curl -H "x-admin-key: prajwal_admin_secret_2025" http://localhost:5000/api/contact
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/health | Health check |
| POST   | /api/contact | Submit message (public) |
| GET    | /api/contact | List all messages (admin) |
| PATCH  | /api/contact/:id/read | Mark as read (admin) |

---

## Deployment (Free)

**Frontend → Vercel**
```bash
cd frontend && npm run build
# Push to GitHub, connect at vercel.com
```

**Backend + PostgreSQL → Railway**
1. Push to GitHub
2. New project at railway.app
3. Add Node service (backend folder) + PostgreSQL service
4. Railway auto-injects DATABASE_URL
5. Set FRONTEND_URL to your Vercel URL

**Or Backend → Render + Neon**
1. Deploy backend to render.com (free tier)
2. Keep using Neon for PostgreSQL
3. Set environment variables in Render dashboard

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, CSS3, Canvas API |
| Animations | CSS Keyframes, react-type-animation |
| Backend | Node.js, Express 4 |
| Database | PostgreSQL (via node-postgres `pg`) |
| Email | Nodemailer + Gmail |
| Security | Helmet, express-rate-limit, CORS |

Built with love by Prajwal Khanal — Sydney, Australia
