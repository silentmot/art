# Project Plan: Development and Launch of an Online Art Store with Integrated Chatbot

## Overview

This plan outlines the development and launch of a cross-platform online art store (digital gallery) featuring a robust chatbot for customer assistance on product descriptions, pricing, materials, and more. It adopts a single codebase for cost-efficiency, using TypeScript + Expo (React Native) + React Native Web + Next.js (App Router) to enable shared UI across iOS, Android, and web (with SSR/SEO). The focus is on technical development, deployment, and stack.

Team:

- **DvoiD**: Human lead for oversight, decisions, reviews, and manual steps.
- **GitHub Copilot**: Real-time code suggestions in IDE.
- **Claude Code**: Structured code generation and architecture.
- **GPT Codex**: Algorithmic tasks, refactoring.
- **Gemini Code Assist (Agent Mode)**: Autonomous iterative code generation, testing, optimization.

No deadlines; progress tracked via per-task checklists and overall success criteria. Mark completed items [x] and log in `changelogs.md` (e.g., "Task 1.1 Completed: Repo initialized with Expo monorepo structure - Details: Added Turbo for workspace management. Updated by DvoiD.").

Stages contain 5-10 actionable, assigned tasks.

## Key Requirements and Preferences

- **Platforms/Features**: iOS, Android, Web. Includes catalog (categories/filters/artist pages), product details (zoom/materials/dimensions), pricing (currency/VAT/promos/coupons), cart/checkout (Stripe/Apple/Google Pay), auth (email/OAuth), profiles/wishlists/orders, inventory (stock/SKU/digital licenses), CMS (artist bios/editorial), chatbot, search/recommendations (Algolia/Meilisearch). Performance: Offline basics (cached catalog/queued cart), image opt (Cloudinary), lazy loading/code-split, RUM, optional AR (Quick Look/SceneViewer), WCAG AA a11y, i18n. Security: PCI via Stripe, GDPR.
- **Frameworks**: Expo (RN) + RN Web + Next.js for JS/TS code sharing. UI: Tamagui. State: Zustand/React Query/Zod. Constraints: JS/TS team familiarity; budget for tools like Vercel/EAS.
- **Scale/Integrations**: 1-10k MAU at launch, scaling to 100k; 200-1k concurrent. Integrations: Stripe, Supabase (preferred for simplicity), Cloudinary, Algolia, PostHog.
- **Chatbot**: OpenAI (gpt-4o-mini/4o) with RAG (pgvector/Supabase), grounding on products/FAQs, tool-calling (product lookup/price/stock/shipping/FAQ).
- **Deployment**: Vercel (web), EAS (mobile), Supabase (backend), GitHub Actions (CI/CD).

## Technology Stack

- **Language**: TypeScript (strict).
- **Frontend**: Expo (React Native for mobile) + React Native Web + Next.js (App Router for web SSR/SEO).
- **UI/State**: Tamagui (design system), Zustand (state), React Query (data fetching), Zod (validation).
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions, pgvector for embeddings).
- **Chatbot**: OpenAI API with RAG (pgvector for vector search on products/FAQs), tool-calling for dynamic queries.
- **Payments**: Stripe (Payment Intents, Apple/Google Pay).
- **Search/Media**: Algolia (search/recommendations), Cloudinary (image CDN/transforms).
- **Analytics/Monitoring**: PostHog (analytics), Sentry (errors) + OpenTelemetry (traces).
- **Deployment**: Vercel (web), EAS (mobile builds/OTA), Supabase (backend).
- **Tools**: Git, Turbo (monorepo), GitHub Actions (CI/CD), Prisma (DB ORM if needed).
- **Rationale**: Expo + Next.js enables 80-90% code reuse; Tamagui ensures consistent styling.

## Project Stages

### Stage 1: Planning and Setup

Focus: Repo, architecture, monorepo config.

- **Task 1.1** Git Repo Initialization  
  _Assigned: DvoiD_  
  _Description: Create monorepo and initialize core files._

  _Completion Checklist_

  - [✅] **Create repo**

    ```bash
    git init art-store && cd art-store
    ```

  - [✅] **Add README.md** (overview, stack, setup).

    ```bash
    echo "# Online Art Store\n\nExpo + Next.js monorepo with Supabase." > README.md
    ```

  - [✅] **Add .gitignore** (node_modules, .expo, .next, .env).

    ```bash
    curl -s https://www.toptal.com/developers/gitignore/api/node,react,reactnative > .gitignore
    ```

  - [✅] **Add changelogs.md** (Keep a Changelog format).

    ```bash
    echo -e "# Changelogs\n\n## [Unreleased]\n### Added\n- Initial monorepo." > changelogs.md
    ```

  - [✅] **Stage & commit**

    ```bash
    git add README.md .gitignore changelogs.md
    git commit -m "Initialize monorepo"
    ```

  - [✅] **Set remote**

    ```bash
    git remote add origin git@github.com:silentmot/art-store.git
    ```

  - [✅] **Push to master**

    ```bash
    git branch -M master
    git push -u origin master
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 1.2** Monorepo Setup  
  _Assigned: GitHub Copilot_  
  _Description: Configure Turbo for Expo + Next.js apps._

  _Completion Checklist_

  - [✅] **Init pnpm** (use pnpm for workspaces).

    ```bash
    pnpm init -y
    ```

  - [✅] **Create turbo.json** (pipelines for build/test).

    ```json
    { "pipeline": { "build": { "dependsOn": ["^build"] } } }
    ```

  - [✅] **Add apps/packages dirs** (apps/mobile, apps/web, packages/ui, packages/models).
  - [✅] **Commit**

    ```bash
    git add turbo.json pnpm-workspace.yaml
    git commit -m "Setup Turbo monorepo"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 1.3** System Architecture Design  
  _Assigned: GPT Codex_  
  _Description: Draft architecture diagram and data model._

  _Completion Checklist_

  - [x] **Generate Mermaid diagram** (from reference).

    ```mermaid
    flowchart TD
    subgraph Client
    Web[Next.js] --> Edge
    iOS[Expo iOS] --> Edge
    Android[Expo Android] --> Edge
    end
    Edge[Vercel/CDN] --> API[Supabase Edge]
    API --> DB[(Postgres/pgvector)]
    API --> STRIPE[[Stripe]]
    API --> CLOUDI[[Cloudinary]]
    API --> ALGOLIA[[Algolia]]
    API <--> OPENAI[[OpenAI]]
    ```

  - [x] **Add data model** (artists, artworks, orders, etc. to models/schema.ts).
  - [x] **Append to README.md**.
  - [ ] **Commit**

    ```bash
    git add docs/architecture.mmd packages/models/schema.ts README.md
    git commit -m "Add architecture and data model"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 1.4** Dependencies Setup  
  _Assigned: Gemini Code Assist_  
  _Description: Add core dependencies via pnpm._

  _Completion Checklist_

  - [ ] **Add root deps**

    ```bash
    pnpm add -w typescript tamagui @tamagui/core zustand @tanstack/react-query zod react-hook-form
    pnpm add -w @supabase/supabase-js @stripe/stripe-js openai cloudinary algoliasearch posthog-js
    pnpm add -w -D turbo @types/react @types/node eslint prettier
    ```

  - [ ] **Update package.json scripts** (turbo run build).
  - [ ] **Commit**

    ```bash
    git add package.json pnpm-lock.yaml
    git commit -m "Setup dependencies"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 1.5** Environment Configs  
  _Assigned: GitHub Copilot_  
  _Description: Setup ESLint, Prettier, .env._

  _Completion Checklist_

  - [ ] **Init ESLint**

    ```bash
    pnpm eslint --init
    ```

  - [ ] **Add Prettier config** (.prettierrc).
  - [ ] **Create .env.example** (SUPABASE_URL, OPENAI_API_KEY, STRIPE_KEY, etc.).
  - [ ] **Commit**

    ```bash
    git add .eslintrc.json .prettierrc .env.example
    git commit -m "Setup configs"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 1.6** UI Wireframes & Shared Components  
  _Assigned: All Agents_  
  _Description: Generate wireframes and initial Tamagui components._

  _Completion Checklist_

  - [ ] **Setup Tamagui config** (tamagui.config.ts in packages/ui).
  - [ ] **Create ArtCard component** (shared for gallery).

    ```tsx
    import { YStack, Text } from "tamagui";
    export const ArtCard = ({ item }) => (
      <YStack>
        <Text>
          {item.title} - ${item.price}
        </Text>
      </YStack>
    );
    ```

  - [ ] **Wireframes in docs/wireframes.md** (gallery, detail, chat).
  - [ ] **Commit**

    ```bash
    git add packages/ui/ docs/
    git commit -m "Add UI wireframes and shared components"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 1.7** Stage Review  
  _Assigned: DvoiD_  
  _Description: Review setups, run lint._

  _Completion Checklist_

  - [ ] **Pull latest**

    ```bash
    git pull origin main
    ```

  - [ ] **Run pnpm install && turbo run lint**.
  - [ ] **Update changelogs.md**.
  - [ ] **Commit adjustments**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

### Stage 2: Backend Development

Focus: Supabase setup, DB schema, API logic.

- **Task 2.1** Supabase Project Setup  
  _Assigned: Claude Code_  
  _Description: Initialize Supabase project and client._

  _Completion Checklist_

  - [ ] **Create Supabase project** (via dashboard; note URL/anon key).
  - [ ] **Add supabase.ts client**

    ```tsx
    import { createClient } from "@supabase/supabase-js";
    export const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );
    ```

  - [ ] **Enable pgvector extension** (via SQL editor).
  - [ ] **Commit**

    ```bash
    git add lib/supabase.ts
    git commit -m "Setup Supabase client"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.2** Database Schema & Migrations  
  _Assigned: GPT Codex_  
  _Description: Define tables (artists, artworks, etc.)._

  _Completion Checklist_

  - [ ] **Run SQL in Supabase** (create tables from data model).

    ```sql
    CREATE TABLE artists (id UUID PRIMARY KEY, name TEXT, bio TEXT);
    -- Add others
    ```

  - [ ] **Add RLS policies** (e.g., auth.uid() for orders).
  - [ ] **Embeddings table with pgvector**.
  - [ ] **Commit migration scripts**

    ```bash
    git add db/migrations/
    git commit -m "Implement DB schema"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.3** Authentication Setup  
  _Assigned: Gemini Code Assist_  
  _Description: Configure Supabase Auth (email/OAuth)._

  _Completion Checklist_

  - [ ] **Enable providers** (dashboard: email, Google, etc.).
  - [ ] **Add auth hooks** (useSession in Zustand).
  - [ ] **RLS for user data**.
  - [ ] **Commit**

    ```bash
    git add lib/auth.ts
    git commit -m "Setup authentication"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.4** Chatbot Backend & RAG  
  _Assigned: GitHub Copilot_  
  _Description: Implement OpenAI integration with tool-calling._

  _Completion Checklist_

  - [ ] **Add openai.ts**

    ```tsx
    import OpenAI from "openai";
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // Tool definitions: getArtworkById, etc.
    ```

  - [ ] **RAG logic** (query pgvector, ground responses).
  - [ ] **Prompt contract** (answer <150 words, cites, links).
  - [ ] **Commit**

    ```bash
    git add lib/chatbot.ts
    git commit -m "Implement chatbot backend"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.5** Integrations (Stripe, Cloudinary, Algolia)  
  _Assigned: Claude Code_  
  _Description: Setup API wrappers._

  _Completion Checklist_

  - [ ] **Stripe client** (Payment Intents).
  - [ ] **Cloudinary uploads/transforms**.
  - [ ] **Algolia indexing** (artworks sync).
  - [ ] **Commit**

    ```bash
    git add lib/integrations/
    git commit -m "Add integrations"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.6** Data Seeding & Tests  
  _Assigned: GPT Codex_  
  _Description: Seed data, add unit tests._

  _Completion Checklist_

  - [ ] **Seed script** (insert 10 artworks).

    ```tsx
    // Use supabase.from('artworks').insert([...])
    ```

  - [ ] **Jest tests for API logic**.
  - [ ] **Run pnpm test**.
  - [ ] **Commit**

    ```bash
    git add seed.ts tests/
    git commit -m "Seed data and add tests"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.7** Edge Functions  
  _Assigned: Gemini Code Assist_  
  _Description: Deploy Supabase Edge for custom logic._

  _Completion Checklist_

  - [ ] **Create function** (e.g., shippingQuote).
  - [ ] **Deploy via CLI**

    ```bash
    supabase functions deploy shippingQuote
    ```

  - [ ] **Test invocation**.
  - [ ] **Commit**

    ```bash
    git add functions/
    git commit -m "Add Edge functions"
    ```

  > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 2.8** Performance & Security  
  _Assigned: All Agents_  
  _Description: Add indexes, RLS, rate limits._

  _Completion Checklist_

  - [ ] **DB indexes** (on search fields).
  - [ ] **Rate limits on chatbot**.
  - [ ] **Test security**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

### Stage 3: Frontend and Chatbot Development

Focus: Expo/Next.js apps, shared UI, integrations.

- **Task 3.1** Mobile App Bootstrap  
  _Assigned: GitHub Copilot_  
  _Description: Init Expo app._

  _Completion Checklist_

  - [ ] **Create Expo**

    ```bash
    cd apps/mobile && npx create-expo-app . --template blank-typescript
    ```

  - [ ] **Add Expo Router**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.2** Web App Bootstrap  
  _Assigned: Claude Code_  
  _Description: Init Next.js app._

  _Completion Checklist_

  - [ ] **Create Next**

    ```bash
    cd apps/web && npx create-next-app@latest . --ts --app
    ```

  - [ ] **Transpile RN packages**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.3** Shared State & Data Fetching  
  _Assigned: GPT Codex_  
  _Description: Setup Zustand/React Query._

  _Completion Checklist_

  - [ ] **Auth store** (useSupabaseAuth).
  - [ ] **Queries for products**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.4** UI Components & Screens  
  _Assigned: Gemini Code Assist_  
  _Description: Build gallery, detail, cart screens._

  _Completion Checklist_

  - [ ] **Use Tamagui** (ArtCard, etc.).
  - [ ] **Lazy loading**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.5** Chatbot UI & Integration  
  _Assigned: GitHub Copilot_  
  _Description: Implement chat interface._

  _Completion Checklist_

  - [ ] **Chat screen** (input, bubbles).
  - [ ] **Call OpenAI with RAG**.
  - [ ] **Handle tools/responses**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.6** Payments & Offline  
  _Assigned: Claude Code_  
  _Description: Integrate Stripe, offline cache._

  _Completion Checklist_

  - [ ] **Stripe hooks**.
  - [ ] **Expo Offline** (AsyncStorage).
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.7** Search & Recs  
  _Assigned: GPT Codex_  
  _Description: Add Algolia search._

  _Completion Checklist_

  - [ ] **InstantSearch UI**.
  - [ ] **Recommendations**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.8** A11y & i18n  
  _Assigned: All Agents_  
  _Description: Add accessibility, localization._

  _Completion Checklist_

  - [ ] **Labels/roles**.
  - [ ] **i18next setup**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 3.9** Cross-Platform Test  
  _Assigned: DvoiD_  
  _Description: Run on emulators/browser._

  _Completion Checklist_

  - [ ] **Test consistency**.
  - [ ] **Fix issues**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

### Stage 4: Testing and Integration

Focus: Tests, security, optimizations.

- **Task 4.1** Unit & Integration Tests  
  _Assigned: Gemini Code Assist_  
  _Description: Jest for components/API._

  _Completion Checklist_

  - [ ] **Test chatbot flows**.
  - [ ] **90% coverage**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.2** E2E Tests  
  _Assigned: GitHub Copilot_  
  _Description: Detox/Cypress for flows._

  _Completion Checklist_

  - [ ] **Browse -> chat -> cart**.
  - [ ] **Run tests**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.3** Security Audit  
  _Assigned: Claude Code_  
  _Description: Check RLS, PCI._

  _Completion Checklist_

  - [ ] **npm audit**.
  - [ ] **Fix vulns**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.4** CI/CD Setup  
  _Assigned: GPT Codex_  
  _Description: GitHub Actions workflows._

  _Completion Checklist_

  - [ ] **web.yml, mobile.yml, db.yml**.
  - [ ] **Test on push**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.5** Manual Testing  
  _Assigned: DvoiD_  
  _Description: Devices/emulators._

  _Completion Checklist_

  - [ ] **Full flows**.
  - [ ] **Feedback**.
  - [ ] **Commit fixes**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.6** Performance Optimization  
  _Assigned: All Agents_  
  _Description: Image opt, lazy._

  _Completion Checklist_

  - [ ] **Cloudinary transforms**.
  - [ ] **Core Web Vitals**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.7** Analytics & Monitoring  
  _Assigned: Gemini Code Assist_  
  _Description: Add PostHog/Sentry._

  _Completion Checklist_

  - [ ] **Init SDKs**.
  - [ ] **Track events**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 4.8** Bug Fixing Iteration  
  _Assigned: Claude Code_  
  _Description: Resolve from tests._

  _Completion Checklist_

  - [ ] **Fix list**.
  - [ ] **Retest**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

### Stage 5: Deployment and Launch

Focus: Deploy, monitor.

- **Task 5.1** Web Deployment  
  _Assigned: GPT Codex_  
  _Description: Vercel setup._

  _Completion Checklist_

  - [ ] **Connect repo**.
  - [ ] **Deploy**.
  - [ ] **Verify URL**.
  - [ ] **Commit config**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.2** Mobile Deployment  
  _Assigned: GitHub Copilot_  
  _Description: EAS builds/submit._

  _Completion Checklist_

  - [ ] **eas.json config**.
  - [ ] **Build & submit**.
  - [ ] **OTA setup**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.3** Backend Deployment  
  _Assigned: Claude Code_  
  _Description: Supabase go-live._

  _Completion Checklist_

  - [ ] **Migrate prod DB**.
  - [ ] **Edge functions deploy**.
  - [ ] **Test APIs**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.4** Domain & SSL  
  _Assigned: Gemini Code Assist_  
  _Description: Configure custom domain._

  _Completion Checklist_

  - [ ] **Vercel domain**.
  - [ ] **SSL auto**.
  - [ ] **Test**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.5** Final Tests  
  _Assigned: DvoiD_  
  _Description: End-to-end live._

  _Completion Checklist_

  - [ ] **Smoke tests**.
  - [ ] **Fix**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.6** Documentation  
  _Assigned: All Agents_  
  _Description: API/usage guides._

  _Completion Checklist_

  - [ ] **Update README**.
  - [ ] **Add docs/**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.7** Scaling Config  
  _Assigned: GPT Codex_  
  _Description: Rate limits, autoscaling._

  _Completion Checklist_

  - [ ] **Supabase scaling**.
  - [ ] **OpenAI limits**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.8** Launch Prep  
  _Assigned: Claude Code_  
  _Description: Announcement script._

  _Completion Checklist_

  - [ ] **Markdown**.
  - [ ] **Social copy**.
  - [ ] **Commit**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

- **Task 5.9** Monitoring & Launch  
  _Assigned: DvoiD_  
  _Description: Go live, watch._

  _Completion Checklist_

  - [ ] **Deploy all**.
  - [ ] **Monitor PostHog/Sentry**.
  - [ ] **Update changelogs**.
    > Update the checklist upon completion, include the details of implementation in the `changelogs.md`

## Overall Success Criteria Checklist

- [ ] Stage 1: Monorepo ready, architecture defined.
- [ ] Backend: Supabase functional, RAG chatbot responds engagingly.
- [ ] Frontend: Cross-platform UI, features (cart/chat/search) work.
- [ ] Tests: 90% coverage, no fails.
- [ ] Deployment: Live on Vercel/EAS/Supabase, secure, performant.
- [ ] Scale: Handles simulated 200 users.

## Guide for Agents

- **Protocol**: DvoiD prompts; generate code per task.
- **Practices**: TS strict, commit often, feature branches.
- **If Stuck**: Query DvoiD.
- **Integration**: Git pulls/reviews.

## Instructions for Code Generation

- **Prompt**: "Generate TSX code for [task], using Tamagui/Supabase."
- **Format**: Comments, tests.
- **Cycle**: Generate > Review > Iterate.

## Reference Materials

- Expo: <https://docs.expo.dev>
- Next.js: <https://nextjs.org/docs>
- Supabase: <https://supabase.com/docs>
- OpenAI: <https://platform.openai.com/docs>
- Tamagui: <https://tamagui.dev/docs>
- Stripe: <https://stripe.com/docs>

Proceed with Stage 1!
