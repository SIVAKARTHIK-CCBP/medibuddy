# Crypto Dashboard - Next.js + TypeScript

A production-like crypto dashboard using CoinGecko API.

## Features
- All Coins View: rank, name, price, 24h change, market cap, volume
- Sorting by price, 24h change, market cap, volume
- Pagination and search (debounced)
- Row click opens detail modal with coin info
- Highlights section: top gainers, top losers, highest volume, trending
- Resilient UX: loading skeletons, retry on error, empty states
- React Query caching, retries, and stale-time config

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- TailwindCSS + shadcn/ui
- React Query
- Axios

## Design Patterns Used
- **Adapter pattern**: lib/api wraps API, keeps UI decoupled from response shapes
- **Custom hook**: useCoins for data fetching/state
- **Separation of concerns**: UI components vs hooks vs API client
- **Resilient UI states**: skeleton loaders, retries

## Setup
```bash
cp .env.example .env.local
npm install
npm run dev
```

## Assumptions & Limitations
- Client-side filtering for search (simpler, avoids extra API calls)
- Trending uses CoinGecko trending endpoint
- Limited to top 20 results per page

## Future Improvements
- WebSocket for real-time prices
- Server-side sorting/filtering for large datasets
- More comprehensive test coverage
- Production hardening: logging, monitoring

## Deployment
Ready to deploy on Vercel/Netlify.

