# 🏪 Rossmann Retail Intelligence Dashboard

> An end-to-end retail analytics web application built with **Next.js 14**, **Tailwind CSS**, and **Recharts** — powered by the [Rossmann Store Sales](https://www.kaggle.com/c/rossmann-store-sales) Kaggle dataset.

![Dashboard Preview](public/preview-placeholder.png)

---

## 📌 Project Aim

To provide a production-grade, interactive analytics dashboard that transforms raw Rossmann retail data into actionable business intelligence — covering store network composition, promotional strategy effectiveness, competitive positioning, and operational patterns.

---

## 🎯 Objectives

1. **Visualise** the distribution of store formats (A/B/C/D) and assortment levels across 1,115 German stores.
2. **Analyse** Promo2 adoption rates by store type and identify under-enrolled segments.
3. **Map** competition distance patterns to surface high-pressure and white-space markets.
4. **Track** operational open/closed patterns across the Aug–Sep 2015 forecast window.
5. **Surface** day-of-week promotional activity and school holiday interaction effects.
6. **Deliver** a fully responsive, filterable dashboard deployable to Vercel in one click.

---

## 🚀 Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | Next.js 14 (App Router)           |
| Styling     | Tailwind CSS 3                    |
| Charts      | Recharts 2                        |
| Icons       | Lucide React                      |
| Language    | TypeScript 5                      |
| Deployment  | Vercel                            |

---

## 📁 Project Structure

```
rossmann-dashboard/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main dashboard page (client component)
│   └── globals.css         # Global styles + Tailwind directives
├── components/
│   ├── charts/
│   │   ├── AssortmentChart.tsx
│   │   ├── AvgDistByTypeChart.tsx
│   │   ├── CompetitionDistChart.tsx
│   │   ├── OpenStoresTimeline.tsx
│   │   ├── PromoByDayChart.tsx
│   │   ├── PromoIntervalChart.tsx
│   │   ├── Promo2ByTypeChart.tsx
│   │   └── StoreTypeChart.tsx
│   ├── ui/
│   │   ├── FilterBar.tsx
│   │   ├── KpiCard.tsx
│   │   └── SectionHeader.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── InsightsPanel.tsx
│   └── Navbar.tsx
├── utils/
│   ├── data.ts             # All static data extracted from CSVs
│   └── helpers.ts          # Formatting & utility functions
├── public/
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Local Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/rossmann-dashboard.git
cd rossmann-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## 🌐 Deployment (Vercel)

### Option 1 — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2 — GitHub Integration

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Vercel auto-detects Next.js — click **Deploy**.

> ⚡ No environment variables are required for the static data version.

### Optional environment variables

| Variable           | Description                              | Default     |
|--------------------|------------------------------------------|-------------|
| `NEXT_PUBLIC_ENV`  | Environment label shown in the UI badge  | `production`|

---

## 📊 Dataset

| File                   | Records | Description                               |
|------------------------|---------|-------------------------------------------|
| `store.csv`            | 1,115   | Store attributes (type, assortment, promo, competition) |
| `test.csv`             | 41,088  | Daily store-level test period (Aug–Sep 2015) |
| `sample_submission.csv`| 41,088  | Submission template (Sales = 0 placeholder) |

Source: [Rossmann Store Sales — Kaggle](https://www.kaggle.com/c/rossmann-store-sales)

---

## 📸 Screenshots

| Section           | Description                              |
|-------------------|------------------------------------------|
| Hero + KPIs       | Summary metrics at a glance              |
| Store Intel       | Pie & bar charts for store type/assortment |
| Promotions        | Grouped bar + radar for promo strategy   |
| Operations        | Area chart of open stores across 48 days |
| Competition       | Histogram + horizontal bar for distances |

*(Replace `public/preview-placeholder.png` with actual screenshots after deployment)*

---

## 💡 Business Impact

- **Inventory Planning** — Assortment analysis reduces stock allocation errors
- **Promotional ROI** — Promo2 gap analysis identifies upsell opportunities
- **Expansion Strategy** — Competition mapping surfaces low-density white-space
- **Operational Efficiency** — Open-store patterns inform staffing schedules

---

## 🔮 Future Improvements

- [ ] Integrate `train.csv` for real sales volume charts
- [ ] Add ML forecast overlay via `/api/predict` route
- [ ] Geospatial map view (Mapbox or Leaflet)
- [ ] Dynamic date-range selector
- [ ] Native mobile app (React Native / Expo)
- [ ] Alert engine for competitive threat detection

---

## 👤 Author

Built as a portfolio project demonstrating end-to-end skills in data engineering, EDA, and full-stack development.

---

## 📄 Licence

MIT — free for personal and commercial use. Dataset subject to Kaggle competition terms.
