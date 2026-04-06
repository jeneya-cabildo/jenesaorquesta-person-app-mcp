# Person App

## Description

Person App is a production-ready Next.js 16 application demonstrating professional CRUD operations with a serverless PostgreSQL database. Built with modern tooling, it showcases best practices for full-stack development including database migrations, server actions, and automated deployment.

**Key Upgrade:** Migrated from Supabase to **Neon PostgreSQL** (Serverless) for improved performance, cost efficiency, and Vercel compatibility.

## Features

- **Full CRUD Operations** - Create, read, update, and delete person records
- **Real-time Search** - Filter contacts by name, email, or phone
- **Production Database** - Neon PostgreSQL with automatic backups and connection pooling
- **Server Actions** - No REST API required, direct database mutations
- **Prisma ORM** - Type-safe database access with migrations
- **Responsive Design** - Mobile-optimized UI with Tailwind CSS
- **Accessibility** - WCAG-compliant components from Radix UI
- **Auto-scaling** - Deployed on Vercel with serverless functions

## Tech Stack

### Frontend
- **Next.js 16** - React framework with Turbopack
- **React 19.2** - Latest React version
- **TypeScript 5+** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library built on Radix UI
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Backend & Database
- **Next.js Server Actions** - Secure backend operations
- **Prisma ORM v7** - Type-safe database access with migrations
- **Neon PostgreSQL** - Serverless, auto-scaling database
- **Connection Pooling** - Optimized for serverless environments

### Deployment
- **Vercel** - Edge functions, auto-scaling, CI/CD
- **GitHub** - Source control and CI/CD integration

## System Requirements

- **Node.js 20.9+** - Required for Next.js 16 compatibility
- **pnpm 10+** - Package manager
- **Neon Account** - For PostgreSQL database (free tier available)
- **Vercel Account** - For deployment (free tier available)

## Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/jeneya-cabildo/jenesaorquesta-person-app.git
cd jenesaorquesta-person-app
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Database

Get your Neon connection string from [console.neon.tech](https://console.neon.tech):

```bash
cp .env.example .env.local
# Edit .env.local and add your DATABASE_URL
```

### 4. Run Migrations

```bash
pnpm db:migrate
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Commands

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio (database GUI)
```

## Database Architecture

### Neon + Vercel Setup
```
User Interface (React)
    ↓
Next.js Server Actions
    ↓
Prisma ORM (Type-safe)
    ↓
PG Adapter (Connection Pooling)
    ↓
Neon PostgreSQL (Serverless)
```

### Why Neon?
- ✅ **Serverless** - Auto-scales with traffic, no management needed
- ✅ **Connection Pooling** - Built-in, perfect for Vercel functions
- ✅ **Free Tier** - Generous credits for development
- ✅ **Backups** - Automatic daily backups included
- ✅ **Performance** - Optimized for modern web applications

## Deployment to Vercel

### Step 1: Set Environment Variables

In Vercel dashboard, add:
```
DATABASE_URL=postgresql://[user]:[password]@[host]-pooler.neon.tech/[database]?sslmode=require
```

**Note:** Use the `-pooler` endpoint for serverless functions.

### Step 2: Deploy

```bash
git push origin main
```

Vercel automatically detects `package.json` changes and deploys.

### Step 3: Verify

Visit your Vercel deployment URL and test the app.

## Documentation

### Key Files
- **[docs/NEON_SETUP.md](docs/NEON_SETUP.md)** - Comprehensive Neon setup guide
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Vercel deployment guide
- **[docs/MIGRATION_SUMMARY.md](docs/MIGRATION_SUMMARY.md)** - Migration from Supabase to Neon
- **[docs/upgrading-next-16.md](docs/upgrading-next-16.md)** - Next.js 16 upgrade notes
- **[QUICK_START.md](QUICK_START.md)** - 5-minute quick reference

## Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── components/          # React components
│   ├── actions/             # Server actions
│   ├── api/                 # API routes
│   ├── database/            # Database schema viewer
│   ├── about/               # About page
│   └── page.tsx             # Home page
├── prisma/                  # Prisma configuration
│   ├── schema.prisma        # Database schema
│   ├── seed.ts              # Database seeding
│   └── migrations/          # Migration history
├── lib/                     # Utility functions
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Helper functions
├── docs/                    # Documentation
├── .env.example             # Environment template
└── vercel.json              # Vercel configuration
```

## API Architecture

### Why No REST API?

This application uses **Next.js Server Actions** instead of traditional REST endpoints:

```tsx
// No need for /api/people endpoints
'use server'
export const getAllPeople = async () => {
  return prisma.person.findMany()
}
```

**Benefits:**
- ✅ Automatic form handling
- ✅ Type-safe - TypeScript validates both client and server
- ✅ Reduced complexity - No API routes to maintain
- ✅ Better performance - Direct database access
- ✅ Built-in security - CSRF protection included

## Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9  # macOS/Linux
taskkill /PID [PID] /F          # Windows
```

### Database Connection Issues
```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL  # macOS/Linux
echo %DATABASE_URL% # Windows

# Test connection
pnpm prisma db execute --stdin < /dev/null
```

### Migrations Issues
```bash
# Reset development database
pnpm prisma migrate reset

# View migration status
pnpm prisma migrate status
```

## Performance Tips

1. **Use Connection Pooling** - Always use the `-pooler` endpoint for Vercel
2. **Batch Queries** - Use `findMany()` instead of multiple `findFirst()` calls
3. **Implement Caching** - Add Next.js ISR for static content
4. **Monitor Database** - Check Neon dashboard for slow queries
5. **Use Indexes** - Prisma creates indexes on `@unique` fields automatically

## Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support & Resources

- **[Neon Documentation](https://neon.tech/docs)** - Database setup and management
- **[Vercel Documentation](https://vercel.com/docs)** - Deployment and environment
- **[Next.js Documentation](https://nextjs.org/docs)** - Framework reference
- **[Prisma Documentation](https://www.prisma.io/docs)** - ORM reference

## License

This project is open source under the MIT License.

## Questions?

Check the documentation files in the `docs/` folder or open an issue on GitHub.
   export default async function UserSearch({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
     const resolvedSearchParams = await searchParams;
     const selectedUserId = resolvedSearchParams?.userId || null;
     const user = selectedUserId ? await getUserById(selectedUserId) : null;

     return (
       <div className="space-y-6">
         <SearchInput />
         {selectedUserId && (
           <Suspense fallback={<p>Loading user...</p>}>
             {user ? <UserCard user={user} /> : <p>User not found</p>}
           </Suspense>
         )}
       </div>
     );
   }
   ```

2. **Improved Performance**:
   - Data fetching has been optimized to avoid redundant calls. The user object is fetched once in `user-search` and passed as a prop to child components like `UserCard` and `DeleteButton`.
   - This eliminates multiple fetches, improving performance and reducing server load.

3. **Interaction with `SearchInput`**:
   - `SearchInput` remains a **Client Component**, responsible for interacting with the user through `react-select`'s `AsyncSelect`.
   - When a user is selected, the URL is updated with the user's ID using `window.history.pushState`. This triggers a re-render of `user-search` to reflect the updated state.

4. **Improved Error Handling**:
   - Validations and controlled/uncontrolled input warnings have been resolved by ensuring consistent handling in forms using React Hook Form and Zod.

5. **Concurrency & Hydration**:
   - React 19.2's concurrent rendering and Next.js 16's support for server components ensure seamless server-client hydration, reducing potential mismatches.

### Known Issues

1. **Toast Messages**:
   - Notifications in `DeleteButton` and `MutableDialog` are currently not showing. This requires debugging the integration of the `Sonner` toast library.

2. **Theme Support**:
   - The `theme-provider` for managing dark and light modes has been removed temporarily. The Tailwind stylesheets need to be updated to align with the new Next.js configuration.

3. **Hydration Warnings**:
   - Some hydration warnings may occur due to external browser extensions like Grammarly or differences in runtime environments. Suppression flags have been added, but further testing is recommended.

---

### Updated Project Structure

```
person-search/
├── app/
│   ├── components/
│   │   ├── user-search.tsx
│   │   ├── search-input.tsx
│   │   ├── user-card.tsx
│   │   ├── user-dialog.tsx
│   │   └── user-form.tsx
│   ├── actions/
│   │   ├── actions.ts
│   │   └── schemas.ts
│   └── page.tsx
├── public/
├── .eslintrc.json
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

### Using `MutableDialog`

The `MutableDialog` component is a reusable dialog framework that can be used for both "Add" and "Edit" operations. It integrates form validation with Zod and React Hook Form, and supports passing default values for edit operations.

#### How `MutableDialog` Works

`MutableDialog` accepts the following props:
- **`formSchema`**: A Zod schema defining the validation rules for the form.
- **`FormComponent`**: A React component responsible for rendering the form fields.
- **`action`**: A function to handle the form submission (e.g., adding or updating a user).
- **`defaultValues`**: Initial values for the form fields, used for editing existing data.
- **`triggerButtonLabel`**: Label for the button that triggers the dialog.
- **`addDialogTitle` / `editDialogTitle`**: Titles for the "Add" and "Edit" modes.
- **`dialogDescription`**: Description displayed inside the dialog.
- **`submitButtonLabel`**: Label for the submit button.

#### Example: Add Operation

To use `MutableDialog` for adding a new user:

```tsx
import { MutableDialog } from './components/mutable-dialog';
import { userFormSchema, UserFormData } from './actions/schemas';
import { addUser } from './actions/actions';
import { UserForm } from './components/user-form';

export function UserAddDialog() {
  const handleAddUser = async (data: UserFormData) => {
    try {
      const newUser = await addUser(data);
      return {
        success: true,
        message: `User ${newUser.name} added successfully`,
        data: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to add user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleAddUser}
      triggerButtonLabel="Add User"
      addDialogTitle="Add New User"
      dialogDescription="Fill out the form below to add a new user."
      submitButtonLabel="Save"
    />
  );
}
```

#### Example: Edit Operation

To use `MutableDialog` for editing an existing user:

```tsx
import { MutableDialog } from './components/mutable-dialog';
import { userFormSchema, UserFormData } from './actions/schemas';
import { updateUser } from './actions/actions';
import { UserForm } from './components/user-form';

export function UserEditDialog({ user }: { user: UserFormData }) {
  const handleUpdateUser = async (data: UserFormData) => {
    try {
      const updatedUser = await updateUser(user.id, data);
      return {
        success: true,
        message: `User ${updatedUser.name} updated successfully`,
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  };

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleUpdateUser}
      defaultValues={user} // Pre-fill form fields with user data
      triggerButtonLabel="Edit User"
      editDialogTitle="Edit User Details"
      dialogDescription="Modify the details below and click save to update the user."
      submitButtonLabel="Update"
    />
  );
}
```

### Note: Future Refactoring for `ActionState` with React 19

The `MutableDialog` component currently uses a custom `ActionState` type to handle the result of form submissions. However, React 19 introduces built-in support for `ActionState` in Server Actions, which can simplify this implementation. 

#### Improvements to Make:
- Replace the custom `ActionState` interface with React 19's built-in `ActionState`.
- Use the `ActionState` directly within the form submission logic to align with React 19 best practices.
- Refactor error handling and success notifications to leverage React's server-side error handling.

This will be addressed in a future update to ensure the `MutableDialog` component remains aligned with React 19's capabilities.

## Contributing

Contributions are welcome! Please submit a Pull Request with your changes.

## License

This project is open source and available under the [MIT License](LICENSE).


## Contact

Callum Bir - [@callumbir](https://twitter.com/callumbir)  
Project Link: [https://github.com/gocallum/person-search](https://github.com/gocallum/person-search)  

