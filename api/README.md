# 🐍 Rossmann Forecast API — Deployment Guide

## Local Setup

```bash
cd api

# 1. Create virtual environment
python3 -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Add your data files
mkdir data
cp /path/to/train.csv data/
cp /path/to/store.csv data/
cp /path/to/test.csv  data/

# 4. Start the API (auto-trains model on first run)
python main.py
# → http://localhost:8000
# → http://localhost:8000/docs  (Swagger UI)
```

---

## Deploy to Railway (Free Tier)

Railway gives you a free Python server — perfect for this API.

### Step 1 — Sign up
Go to [railway.app](https://railway.app) → Sign up with GitHub

### Step 2 — Create new project
- Click **"New Project"** → **"Deploy from GitHub repo"**
- Select your `rossmann-dashboard` repo
- Set **Root Directory** to `api`

### Step 3 — Add environment variables
In Railway dashboard → Variables tab → Add:
```
DATA_DIR=./data
ALLOWED_ORIGINS=https://rossmann-dashboard.vercel.app
```

### Step 4 — Upload data files
Since train.csv is large (38MB), use Railway's volume or upload via CLI:
```bash
npm install -g @railway/cli
railway login
railway up --service rossmann-api
```

### Step 5 — Get your API URL
Railway gives you a URL like:
```
https://rossmann-api-production.up.railway.app
```

### Step 6 — Connect to Vercel
In Vercel dashboard → Your project → Settings → Environment Variables → Add:
```
NEXT_PUBLIC_API_URL=https://rossmann-api-production.up.railway.app
```

Redeploy your Vercel project — the dashboard will now fetch live predictions!

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | API status |
| `/health` | GET | Model health check |
| `/predict` | POST | Single store-day prediction |
| `/forecast/timeline` | GET | Daily network forecast |
| `/forecast/by-type` | GET | Sales by store type |
| `/forecast/promo-impact` | GET | Promo lift analysis |
| `/forecast/store-ranking` | GET | Top N store predictions |
| `/forecast/heatmap` | GET | Weekly heatmap data |

## Swagger Docs
Once running: `http://localhost:8000/docs`
