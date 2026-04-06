# Upgrading to Next.js 16

This document describes the changes made to upgrade this project from Next.js 15 to Next.js 16.

**Official Guide:** https://nextjs.org/docs/app/guides/upgrading/version-16

## Upgrade Summary

- **Next.js**: 15.1.3 → 16.0.5
- **React**: 19.0.0 → 19.2.0
- **React DOM**: 19.0.0 → 19.2.0
- **react-day-picker**: 8.10.1 → 9.11.2 (for React 19 compatibility)

## Upgrade Method

The upgrade was performed using the official Next.js codemod:

```bash
npx @next/codemod@canary upgrade latest
```

This codemod automatically:
- Updates `next.config.ts` to use the new `turbopack` configuration
- Migrates from `next lint` to ESLint CLI
- Removes `unstable_` prefix from stabilized APIs
- Removes `experimental_ppr` Route Segment Config from pages and layouts

## Key Breaking Changes in Next.js 16

### 1. Turbopack by Default

Turbopack is now stable and used by default with `next dev` and `next build`. No `--turbopack` flag needed.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

To opt out and use Webpack instead:
```bash
next build --webpack
```

### 2. Turbopack Configuration Location

The `experimental.turbo` config is now a top-level `turbopack` option:

```typescript
// Next.js 15
const nextConfig = {
  experimental: {
    turbopack: { /* options */ }
  }
}

// Next.js 16
const nextConfig = {
  turbopack: { /* options */ }
}
```

### 3. Async Request APIs (Breaking Change)

Synchronous access to request APIs is fully removed. These APIs must be accessed asynchronously:

- `cookies()`
- `headers()`
- `draftMode()`
- `params` in layout.js, page.js, route.js
- `searchParams` in page.js

```typescript
// Next.js 15 (deprecated sync access)
export default function Page({ params }) {
  const { slug } = params;
}

// Next.js 16 (async required)
export default async function Page({ params }) {
  const { slug } = await params;
}
```

### 4. `next lint` Command Removed

The `next lint` command has been removed. Use ESLint directly:

```json
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

### 5. Middleware Renamed to Proxy (Optional)

The `middleware` filename is deprecated and renamed to `proxy`. However, if you need the `edge` runtime, keep using `middleware`.

```bash
# Rename if not using edge runtime
mv middleware.ts proxy.ts
```

### 6. React 19.2 Features

Next.js 16 includes React 19.2 with new features:
- **View Transitions**: Animate elements during navigation
- **useEffectEvent**: Extract non-reactive logic from Effects
- **Activity**: Render "background activity" with `display: none`

### 7. React Compiler Support (Stable)

Built-in React Compiler support is now stable:

```typescript
const nextConfig = {
  reactCompiler: true,
}
```

### 8. New Caching APIs

- `cacheLife` and `cacheTag` are now stable (remove `unstable_` prefix)
- New `updateTag` for read-your-writes semantics
- New `refresh` function for client router refresh
- `revalidateTag` now accepts a `cacheLife` profile as second argument

### 9. next/image Changes

Several breaking changes:
- **minimumCacheTTL**: Default changed from 60s to 4 hours (14400s)
- **imageSizes**: Value `16` removed from default array
- **qualities**: Default changed to only `[75]`
- **Local IP**: Blocked by default (set `dangerouslyAllowLocalIP: true` for private networks)
- **maximumRedirects**: Default changed to 3 max redirects

### 10. ESLint Flat Config

`@next/eslint-plugin-next` now defaults to ESLint Flat Config format.

### 11. Parallel Routes Requirement

All parallel route slots now require explicit `default.js` files.

### 12. Performance Improvements

- Separate output directories for dev (`.next/dev`) and build (`.next`)
- Turbopack File System Caching (beta) available
- Enhanced routing and navigation with layout deduplication

## Removed Features

- **AMP Support**: All AMP APIs removed
- **Runtime Configuration**: `serverRuntimeConfig` and `publicRuntimeConfig` removed (use env vars)
- **devIndicators Options**: `appIsrStatus`, `buildActivity`, `buildActivityPosition` removed
- **experimental.dynamicIO**: Renamed to `cacheComponents`
- **unstable_rootParams**: Removed

## Node.js & Browser Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | 20.9+ (18 no longer supported) |
| TypeScript | 5.1.0+ |
| Chrome | 111+ |
| Edge | 111+ |
| Firefox | 111+ |
| Safari | 16.4+ |

## Project-Specific Changes Made

### package.json

Updated dependencies:
```json
{
  "dependencies": {
    "next": "16.0.5",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "react-day-picker": "^9.11.2"
  },
  "devDependencies": {
    "eslint-config-next": "16.0.5",
    "@types/react": "19.2.7",
    "@types/react-dom": "19.2.3"
  },
  "scripts": {
    "lint": "eslint ."
  }
}
```

### next.config.ts

The configuration was updated to move turbopack from experimental to top-level:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    resolveAlias: {
      // Custom aliases if needed
    }
  },
  // ... other config
};

export default nextConfig;
```

### Async APIs

This project already uses async patterns for `searchParams` in route handlers (see `app/api/people/route.ts`), so no changes were needed for async request APIs.

## Verification Steps

After upgrading, verify the application works correctly:

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run production build
pnpm build

# Run linting
pnpm lint
```

## Additional Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js Codemods](https://nextjs.org/docs/app/guides/upgrading/codemods)
- [React 19.2 Announcement](https://react.dev/blog/2025/10/01/react-19-2)
- [Turbopack Documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack)
