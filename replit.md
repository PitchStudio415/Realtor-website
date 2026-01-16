# Easy Bay Living - Real Estate Website

## Overview
A professional real estate website for a Bay Area realtor serving Alameda and Contra Costa counties. The site features educational content for first-time buyers and sellers, neighborhood guides, a blog, and contact/lead capture functionality.

## Tech Stack
- **Frontend**: React + TypeScript, Wouter (routing), Tailwind CSS, Shadcn UI
- **Backend**: Express.js with in-memory storage
- **Forms**: React Hook Form with Zod validation

## Project Structure

```
client/src/
├── components/
│   ├── layout/         # Header, Footer, Layout wrapper
│   └── ui/             # Shadcn UI components
├── lib/
│   ├── content.ts      # Static content (blog posts, education modules, neighborhoods)
│   └── queryClient.ts  # TanStack Query setup
├── pages/
│   ├── Home.tsx        # Landing page with hero, proof blocks, CTAs
│   ├── Buy.tsx         # Buyer services page
│   ├── Sell.tsx        # Seller services page
│   ├── BuyerHub.tsx    # First-time buyer education hub
│   ├── SellerHub.tsx   # Seller education hub
│   ├── Neighborhoods.tsx # Neighborhood directory
│   ├── Blog.tsx        # Blog with search/filter
│   ├── About.tsx       # About the realtor
│   ├── Contact.tsx     # Contact form
│   ├── Privacy.tsx     # Privacy policy
│   └── Terms.tsx       # Terms of service
└── App.tsx             # Main app with routing

server/
├── routes.ts           # API endpoints
├── storage.ts          # In-memory data storage
└── index.ts            # Express server setup

shared/
└── schema.ts           # Shared TypeScript types and Zod schemas
```

## Key Features

### Pages
- **Home**: Hero section, 3 proof blocks, education cards, newsletter signup, recent blog posts
- **Buy/Sell**: Service explanations with step-by-step timelines
- **Buyer Hub**: 7 educational modules (timeline, offers, financing, closing costs, inspections, mistakes, glossary)
- **Seller Hub**: 7 educational modules (pricing, disclosures, prep, repairs vs credits, evaluating offers, timeline, glossary)
- **Neighborhoods**: 10 East Bay cities with detailed profiles
- **Blog**: 6 articles with category filtering and search
- **Contact**: Form with validation, submits to backend API

### API Endpoints
- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - List all contacts
- `POST /api/newsletter` - Subscribe to newsletter
- `GET /api/newsletter` - List all subscribers

## How to Add Content

### Adding a Blog Post
Edit `client/src/lib/content.ts` and add to the `blogPosts` array:
```typescript
{
  slug: "your-post-slug",
  title: "Your Post Title",
  excerpt: "Brief description for cards...",
  category: "first-time-buyers", // or: selling, financing, market-basics, inspections
  publishedAt: "2025-01-15",
  content: `# Your Post Title
Your markdown content here...`
}
```

### Adding a Neighborhood
Edit `client/src/lib/content.ts` and add to the `neighborhoods` array:
```typescript
{
  slug: "city-name",
  name: "City Name",
  county: "alameda", // or: contra-costa
  overview: "Brief city description...",
  housingStock: "Types of homes available...",
  lifestyle: "What it's like to live there...",
  whoItFits: "Ideal residents..."
}
```

### Adding Education Modules
Add to `buyerModules` or `sellerModules` arrays in `client/src/lib/content.ts`.

## Environment Variables

### Required for Email Integration (Future)
When adding email functionality (e.g., Resend):
- `RESEND_API_KEY` - API key for sending emails

### Optional Analytics
- `VITE_GA_ID` - Google Analytics tracking ID (if needed)

## Design System

### Colors (defined in index.css)
- **Primary**: Blue (hsl 199 89% 48%) - trust, professionalism
- **Accent**: Green (hsl 152 50% 45%) - growth, success
- **Background**: White/dark gray
- **Foreground**: Dark blue-gray

### Fonts
- **Sans**: Plus Jakarta Sans (headings, body)
- **Serif**: Libre Baskerville (optional accent)
- **Mono**: JetBrains Mono (code)

## Running the Project
The application runs on port 5000 with `npm run dev`. Frontend and backend are served from the same port via Vite.

## Recent Changes
- January 2025: Initial build with all core pages and features
