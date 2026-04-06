## Coding Rules 
- strict TypeScript 5+ and strong type safety. Ensure all eslint rules are followed 
- Next.js version 16 is the current version (Turbopack enabled by default)
- React 19.2 is used - leverage new features like View Transitions, useEffectEvent, and Activity where appropriate
- Use Server Components by default, only use Client Components when necessary (for interactivity, browser APIs, hooks)
- Use pnpm as the package manager (not npm or yarn)
- Follow Shadcn UI patterns for all UI components - use existing components when possible
- Adhere to the default style variant for Shadcn components
- Use Tailwind CSS for styling with custom CSS variables as defined in the project
- Ensure all components are properly typed with explicit return types
- Prefer async/await over .then() chains
- Prefer named exports over default exports for better imports
- Maintain accessibility standards:  
  - Use ARIA attributes where necessary  
  - Write semantic HTML  
  - Ensure proper keyboard navigation
- Keep component files focused on a single responsibility
- Use the cn() utility for conditional class names
- File naming: Use kebab-case for files and PascalCase for React components
- Imports should be organized in groups: React/Next.js, external libraries, internal components/utils
- Prefer function declarations for components over arrow functions
- Use Lucide icons for consistency across the application
- All forms should include proper validation and error handling
- Comments should explain "why" not "what" the code does
- Prevent error: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities


## Shadcn UI Component Guidelines
- Always use the Shadcn button variants rather than creating custom buttons
- Shadcn components should be imported from @/components/ui/[component-name]
- When extending Shadcn components, follow the same pattern of using variants and className composition
- For form elements, use the Shadcn Form component with proper validation schemas
- Keep the theme consistent using the dark/light mode provided by the ThemeProvider
- Don't modify the core Shadcn components directly; instead extend them using composition
- Use the appropriate semantic Shadcn component for each use case (e.g., Dialog for modals, Sheet for side panels)

## Next.js Best Practices
- Use proper metadata objects for SEO in each page
- Implement proper error handling with error.tsx files
- Use loading.tsx for loading states where appropriate
- Follow the route groups pattern using parentheses (example: (auth)/login) for organizational purposes
- Implement proper route parameters typing with zod validation when needed
- Use route handlers (app/api) with proper request/response typing
- Always use the Next.js Image component for images with proper sizing
- Leverage server actions for form submissions where appropriate
- Use proper caching strategies with revalidate options

## Data Fetching and State Management
- Prefer server-side data fetching in Server Components where possible
- Use SWR for client-side data fetching with proper caching strategies
- Implement optimistic updates for better UX when appropriate
- Keep state as local as possible; lift state only when necessary
- Use React Context only for truly global state (e.g., theme, authentication)
- Properly type all API responses and request bodies
- Implement proper error handling for all data fetching operations
- Use React Query's staleTime and cacheTime appropriately when needed
- Prefer small, focused API endpoints over large, multipurpose ones

## Performance Optimization
- Implement proper component memoization (React.memo, useMemo, useCallback) only when needed
- Use dynamic imports (next/dynamic) for code splitting where appropriate
- Optimize images using Next.js Image with proper priority for LCP images
- Implement proper font loading strategies with next/font
- Minimize client-side JavaScript by leveraging Server Components
- Use the viewport API for intersection-based loading when appropriate
- Implement proper keyboard navigation and focus management
- Keep bundle size small by being mindful of dependencies
- Use streaming where appropriate for improved TTFB

## Notes

### Async Request APIs (Next.js 16)
In Next.js 16, synchronous access to request APIs has been fully removed. These must be accessed asynchronously:
- `cookies()`, `headers()`, `draftMode()`
- `params` in layout.js, page.js, route.js
- `searchParams` in page.js

```typescript 
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>My Post: {slug}</div>
}
```

### Turbopack
Turbopack is now the default bundler for both `next dev` and `next build`. No `--turbopack` flag is needed.

### Linting
The `next lint` command has been removed. Use `pnpm lint` which runs `eslint .` directly.

### New React 19.2 Features
- **View Transitions**: Animate elements during navigation
- **useEffectEvent**: Extract non-reactive logic from Effects
- **Activity**: Render background UI with `display: none` while maintaining state

### Package Manager
This project uses **pnpm**. Always use pnpm commands:
- `pnpm install` - Install dependencies
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run linting

