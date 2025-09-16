# Changelogs

## [Unreleased]

### Added

- **Task 1.1** Git Repo Initialization
  - Initial monorepo.
  - Added README.md with project overview, stack, and setup instructions.
  - Added .gitignore to exclude node_modules, .expo, .next, and .env files.
  - Added changelogs.md to track changes in Keep a Changelog format.
  - Staged and committed initial files.
  - Set remote repository to GitHub.
  - Pushed initial commit to master branch.

> **Task done by DvoiD on 2024-10-05**

- **Task 1.2** Monorepo Setup
  - Initialized pnpm workspace with package.json configuration.
  - Created turbo.json with build/dev/test/lint/type-check tasks and proper dependencies.
  - Set up workspace directory structure: apps/mobile, apps/web, packages/ui, packages/models.
  - Configured pnpm-workspace.yaml to include `apps/*` and `packages/*` directories.
  - Updated package.json with workspace scripts, metadata, and turbo dependency.
  - Committed all monorepo configuration files with descriptive commit message.

> **Task done by GitHub Copilot on 2025-09-16**

- **Task 1.3** System Architecture Design
  - Added docs/architecture.mmd Mermaid diagram covering clients, Supabase, and service integrations.
  - Introduced Zod schemas in packages/models/schema.ts for artists, artworks, inventory, orders, payments, customers, carts, and wishlists.
  - Expanded README.md with architecture summary and schema references.

> **Task done by GPT Codex on 2025-09-16**
