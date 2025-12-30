# Enterprise Operations & Analytics Platform

A production-grade internal dashboard application demonstrating advanced frontend engineering skills. Features a custom design system, real-time analytics with Supabase backend, advanced data tables with filtering and export capabilities, and complete authentication with role-based access control.

**Built with:** React 18, TypeScript, Vite, Zustand, Supabase, React Router

## Key Features

### Authentication & Security
- Complete Supabase authentication (login/signup)
- Protected routes with automatic redirection
- Row Level Security (RLS) policies
- User profile management
- Secure session handling

### Dashboard & Analytics
- Real-time business metrics (users, revenue, sales)
- Growth rate monitoring
- Interactive stat cards with loading states
- Data aggregation and analytics

### Data Management
- **Transactions Page**: Advanced data explorer with multi-field filtering
- **Users Page**: Complete user management interface
- **Settings Page**: Profile editing capabilities
- CSV export functionality
- Pagination and data virtualization
- Table sorting and filtering

### UI/UX Components
- Custom design system with modular CSS
- Responsive sidebar navigation
- Modal dialogs for editing
- Toast notifications
- Loading skeletons
- Professional table components

## Project Structure

```
src/
├── app/
│   ├── layout/          # Sidebar, Topbar, AppLayout
│   ├── routes.tsx       # React Router config
│   └── ProtectedRoute.tsx
├── features/
│   ├── auth/            # Login, SignUp pages
│   ├── dashboard/       # Dashboard with stats
│   ├── data-explorer/   # Data filtering & CSV export
│   ├── settings/        # Profile settings
│   └── users/           # User management
├── services/
│   └── supabase/        # Supabase services & types
├── store/
│   └── auth.store.ts    # Zustand auth state
├── ui/                  # Reusable components
│   ├── button/
│   ├── input/
│   ├── modal/
│   ├── skeleton/
│   ├── table/
│   └── toast/
└── main.tsx             # App entry point
```

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **State Management** | Zustand |
| **Routing** | React Router v6 |
| **Backend** | Supabase (PostgreSQL, Auth, RLS) |
| **Styling** | CSS Modules |
| **Build Tool** | Vite |

## Prerequisites

- Node.js 18+ and npm
- Supabase account ([app.supabase.com](https://app.supabase.com))

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enterprise-ops-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create `.env` file in the root:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Get credentials from: Supabase Dashboard → Project Settings → API

4. **Set up database**

   Run `supabase-rls-policies.sql` in Supabase SQL Editor:
   - Creates `profiles` and `data_records` tables
   - Enables Row Level Security
   - Sets up authentication triggers
   - Creates secure access policies

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173)

## Database Schema

### `profiles` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (references auth.users) |
| `first_name` | text | User's first name |
| `last_name` | text | User's last name |
| `department` | text | Department name |
| `role` | text | User role (admin/editor/viewer) |
| `status` | text | Account status (active/pending/inactive) |
| `avatar_url` | text | Profile picture URL (nullable) |
| `created_at` | timestamp | Account creation timestamp |
| `updated_at` | timestamp | Last update timestamp |

### `data_records` Table
| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `category` | text | Product/service category |
| `product` | text | Product name |
| `region` | text | Geographic region |
| `sales` | integer | Number of sales |
| `revenue` | numeric | Total revenue |
| `profit` | numeric | Total profit |
| `record_date` | date | Transaction date |
| `quarter` | text | Fiscal quarter |
| `created_at` | timestamp | Record creation timestamp |

## Available Scripts

```bash
npm run dev        # Start development server (port 5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Usage Guide

### Authentication Flow

1. **Sign Up**: Create account with email, password, name, and department
2. **Login**: Access dashboard with credentials
3. **Auto Profile Creation**: Profile automatically created via database trigger
4. **Logout**: Secure session termination

### Navigation

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Business metrics and KPIs |
| Transactions | `/transactions` | Data explorer with filters |
| Users | `/users` | User management interface |
| Reports | `/reports` | Placeholder for analytics |
| Settings | `/settings` | Profile editing |

### Data Filtering (Transactions Page)

Apply multiple filters simultaneously:
- **Category**: Filter by product category
- **Region**: Filter by geographic region
- **Date Range**: From/to date selection
- **Revenue Range**: Min/max revenue filters
- **Export**: Download filtered results as CSV

### User Management

Admin capabilities:
- View all system users
- Edit user profiles (name, department, role)
- Filter by role, status, or department
- Update via modal interface

## Security Features

### Row Level Security (RLS)

All tables protected with Supabase RLS:
- Users can view all profiles (read-only)
- Users can update only their own profile
- Admin-only data modification policies
- Automatic profile creation on signup

### Best Practices

- Environment variables for sensitive data
- Anon keys for client-side operations
- Service role keys only in secure environments
- SQL injection protection via prepared statements

## Troubleshooting

### Common Issues

**Issue**: Infinite recursion in RLS policy
**Solution**: Re-run `supabase-rls-policies.sql`

**Issue**: Login redirects immediately
**Solution**: Verify RLS policies allow profile reads

**Issue**: Data not loading
**Solution**: Check `.env` credentials and Supabase project status

**Issue**: TypeScript build errors
**Solution**: Run `npm install` and verify tsconfig.app.json

## Customization

### Adding New Features

1. Create feature folder: `src/features/my-feature/`
2. Add pages, components, hooks
3. Update routes in `src/app/routes.tsx`
4. Add navigation in `src/app/layout/AppLayout.tsx`

### Styling Guide

Use CSS Modules for component styles:

```tsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return <div className={styles.container}>Content</div>;
}
```

## Performance Optimizations

- Component memoization with React.memo
- Zustand selectors prevent unnecessary re-renders
- Table pagination limits data fetching
- Route-based code splitting
- CSS Modules for efficient styling
- Skeleton loading states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## License

MIT License - see LICENSE file for details

## Resources

- [React Documentation](https://react.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/)

## Topics/Tags

```
react typescript dashboard enterprise supabase zustand vite authentication data-visualization css-modules frontend-architecture state-management rls postgres
```

---

**Version**: 1.0.0
**Last Updated**: December 2025
