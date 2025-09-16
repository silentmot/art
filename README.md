# Online Art Store

Expo + Next.js monorepo with Supabase.

## Architecture Outline

A Mermaid diagram describing client applications, delivery edge, Supabase services, and third-party integrations is stored at `docs/architecture.mmd`.

Key components represented:
- Next.js web app, Expo iOS, Expo Android, and Tamagui chatbot interface calling Vercel edge.
- Supabase edge functions orchestrating Postgres with pgvector, Auth, and Storage.
- Integrations to Stripe for payments, Cloudinary for media, Algolia for search, PostHog for analytics, Sentry for monitoring, and OpenAI for the chatbot layer.

## Domain Schema

Shared Zod models in `packages/models/schema.ts` define the contract for:
- Artists with localized bios, media assets, and presence metadata.
- Artworks covering pricing, availability, editions, and linked media collections.
- Orders composed of line items, payments, shipments, and monetary totals.
- Customers, addresses, carts, and wishlists that power personalization flows.

These schemas provide a single source of truth for client validation and Supabase migrations.
