# Repository Guidelines

> Whatever action you can do yourself, Please do yourself, this includes starting apps and verification

## Project Structure & Module Organization

This repository is an empty starting point for a Next.js landing page. Use the App Router when scaffolding. Keep routes and layouts in `app/`, reusable UI in `components/`, utilities in `lib/`, and static assets in `public/`. Place component tests beside their source as `*.test.tsx`; reserve `tests/` for end-to-end tests.

```text
app/             routes, layouts, metadata, and global styles
components/      reusable React components
lib/             shared helpers and configuration
public/          images, fonts, and other static files
public/assets/   generated illustrations and landing-page media, served at `/assets/*`
tests/           end-to-end tests
```

## Build, Test, and Development Commands

After the Next.js app is initialized, use the scripts defined in `package.json`:

- `npm install` installs pinned dependencies from the lockfile.
- `npm run dev` starts the local development server.
- `npm run build` creates the production build and catches compilation errors.
- `npm run start` serves the completed production build locally.
- `npm run lint` runs the configured ESLint checks.
- `npm test` runs the test suite once this script and a test framework are added.

Do not document or depend on a command until its script exists in `package.json`.

## Coding Style & Naming Conventions

Use TypeScript and React Server Components by default. Add Client Components only where browser APIs or interactivity require them. Indent with two spaces. Name components in PascalCase (`HeroSection.tsx`), hooks with a `use` prefix (`useMenuState.ts`), and utilities in camelCase. Use kebab-case for route segments and assets. Prefer focused components and semantic HTML. Run the configured formatter and linter before committing.

## Iconography

Use Phosphor Icons for interface icons throughout the project. Import server-rendered icons from `@phosphor-icons/react/dist/ssr` and icons used inside Client Components from `@phosphor-icons/react`. Keep icon weights and sizing consistent within each interface, include `aria-hidden="true"` when an icon is decorative, and do not introduce another icon library without an explicit project requirement.

## Assets & Generated Media

Store website imagery and other display media in `public/assets/`; files there are referenced in components as `/assets/<filename>`. Use descriptive kebab-case filenames such as `market-trend-research.webp`. Generate landing-page illustrations specifically for this portfolio instead of using generic stock images. Match the established editorial-finance palette and content, provide meaningful alt text, optimize final files for the web, and avoid embedding sensitive financial data, live signals, holdings, or proprietary inputs in generated visuals.

## Testing Guidelines

No testing framework or coverage threshold is configured yet. When adding one, include its configuration and `npm test` script in the same change. Test user-visible behavior, accessibility, responsive navigation, and primary calls to action. Use descriptive names such as `HeroSection.test.tsx` and keep fixtures minimal.

## Commit & Pull Request Guidelines

There is no existing commit history to establish a local convention. Use concise, imperative commits, preferably Conventional Commits such as `feat: add responsive hero` or `fix: improve mobile nav focus`. Pull requests should explain the user-facing change, list validation commands, link relevant issues, and include desktop and mobile screenshots for visual changes. Keep unrelated refactors out of feature PRs.

## Security & Configuration

Store local secrets in `.env.local`, never commit them, and document required variable names in `.env.example` without values. Treat all browser-exposed `NEXT_PUBLIC_*` variables as public.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
