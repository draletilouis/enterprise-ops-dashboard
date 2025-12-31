# Stratify — Enterprise Operations Platform

A production-grade internal dashboard application built with Google's Material Design 3. Features a professional design system, real-time analytics with Supabase backend, advanced data management capabilities, and complete authentication with role-based access control.

**Built with:** React 19, TypeScript, Vite, Zustand, Supabase, React Router, Material Design 3

## Design System

### Google Material Design 3
- **Typography**: Google Sans / Product Sans / Roboto font family
- **Color Palette**: Google's signature colors (Google Blue #1A73E8, etc.)
- **Elevation**: Material Design 3 shadow system
- **Motion**: Material motion curves (cubic-bezier 0.4, 0, 0.2, 1)
- **Components**: Pills, cards, and surfaces with proper elevation
- **Spacing**: Google's 8px grid system (8px, 16px, 24px)

### Professional UI Components
- Clean, minimalist interface inspired by Google Workspace
- Pill-shaped navigation items with smooth hover states
- Elevated cards with subtle Material shadows
- Professional user dropdown menu
- Responsive sidebar with collapsible states
- Modern scrollbars with Google's subtle design

## Key Features

### Authentication & Security
- Complete Supabase authentication (login/signup)
- Professional user dropdown menu with Settings and Sign out
- Protected routes with automatic redirection
- Row Level Security (RLS) policies
- Secure session handling
- User profile management

### Dashboard & Analytics
- Real-time business metrics dashboard
- Interactive stat cards with growth indicators
- Recharts integration for data visualization
- Activity feed with user interactions
- Compact, information-dense layout
- Material Design card elevation

### Data Management
- **Transactions Page**: Advanced data explorer with multi-field filtering
- **Users Page**: Complete user management interface
- **Settings Page**: Profile editing capabilities
- **Reports Page**: Analytics placeholder
- CSV export functionality
- Pagination and table sorting
- Multi-field filtering system

### UI/UX Components
- Material Design 3 design system
- Responsive sidebar navigation (280px standard, 72px collapsed)
- Professional topbar (64px height)
- Modal dialogs with proper elevation
- Toast notifications
- Loading skeletons
- Custom button and input components
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
│   ├── dashboard/       # Dashboard with stats & charts
│   ├── data-explorer/   # Data filtering & CSV export
│   ├── settings/        # Profile settings
│   └── users/           # User management
├── services/
│   └── supabase/        # Supabase services & types
├── store/
│   └── auth.store.ts    # Zustand auth state
├── styles/
│   ├── global.css       # Global Material Design styles
│   └── theme.ts         # Material Design theme tokens
├── ui/                  # Reusable components
│   ├── button/          # Material Design buttons
│   ├── input/           # Material Design inputs
│   ├── modal/           # Elevated modal dialogs
│   ├── skeleton/        # Loading skeletons
│   ├── table/           # Professional tables
│   └── toast/           # Toast notifications
└── main.tsx             # App entry point
```

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19.2.0, TypeScript 5.8.0, Vite 6.0.6 |
| **State Management** | Zustand 5.0.3 |
| **Routing** | React Router v7.1.3 |
| **Backend** | Supabase (PostgreSQL, Auth, RLS) |
| **Design System** | Google Material Design 3 |
| **Styling** | CSS Modules |
| **Charts** | Recharts 2.15.1 |
| **Build Tool** | Vite |

## Prerequisites

- Node.js 18+ and npm
- Supabase account ([app.supabase.com](https://app.supabase.com))

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/draletilouis/enterprise-ops-dashboard.git
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
4. **User Menu**: Access Settings and Sign out from avatar dropdown
5. **Logout**: Secure session termination

### Navigation

| Page | Route | Description |
|------|-------|-------------|
| Dashboard | `/dashboard` | Business metrics, charts, and activity feed |
| Transactions | `/transactions` | Data explorer with multi-field filters |
| Users | `/users` | User management interface |
| Reports | `/reports` | Analytics reports (placeholder) |
| Settings | `/settings` | Profile editing and preferences |

### Professional User Menu

Click your avatar in the top-right to access:
- **Settings**: Navigate to profile settings
- **Sign out**: Secure logout

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
- Secure session handling with Supabase Auth

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

### Material Design Styling Guide

Use CSS Modules with Material Design tokens:

```tsx
import styles from './MyComponent.module.css';

export function MyComponent() {
  return (
    <div className={styles.container}>
      <button className={styles.materialButton}>
        Click me
      </button>
    </div>
  );
}
```

### Material Design 3 Tokens

```css
/* Colors */
--google-blue: #1A73E8;
--google-green: #34A853;
--google-red: #EA4335;
--google-yellow: #FBBC04;

/* Typography */
font-family: "Google Sans", "Product Sans", "Roboto", sans-serif;

/* Shadows (Material Design elevation) */
box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
            0 1px 3px 1px rgba(60, 64, 67, 0.15);

/* Motion */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* Spacing (8px grid) */
padding: 8px, 16px, 24px;
```

## Performance Optimizations

- Component memoization with React.memo
- Zustand selectors prevent unnecessary re-renders
- Table pagination limits data fetching
- Route-based code splitting
- CSS Modules for efficient styling
- Skeleton loading states
- Optimized Material Design animations

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
- [Material Design 3](https://m3.material.io/)
- [Supabase Docs](https://supabase.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com/)
- [Vite](https://vite.dev/)
- [Recharts](https://recharts.org/)

## Topics/Tags

```
react typescript dashboard enterprise supabase zustand vite material-design-3 google-design authentication data-visualization css-modules frontend-architecture state-management rls postgres recharts
```

---

**Version**: 1.0.0
**Last Updated**: January 2026
**Design System**: Google Material Design 3
