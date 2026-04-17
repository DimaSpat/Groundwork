# Authentication Flow Documentation

## Overview

This authentication system implements role-based access control (RBAC) with three distinct access levels:
- **Customer-only pages**: Accessible only by users with the `customer` role
- **Owner-only pages**: Accessible only by users with the `owner` role
- **Shared pages**: Accessible by both customers and owners

## Architecture

### Backend (Fastify + PostgreSQL)

Located at `groundwork-backend/routes/user/index.js`

**Endpoints:**
- `POST /user/register` - Creates a new user with hashed password and returns JWT token
- `POST /user/login` - Authenticates user and returns JWT token

**User Roles:**
- `owner` - Full access to all owner-specific features
- `manager` - Company management features (future use)
- `worker` - Employee features (future use)
- `customer` - Customer-facing features

### Frontend (Next.js App Router)

#### Middleware (`src/app/middleware.ts`)

The middleware intercepts all requests and enforces access control based on JWT tokens.

**Route Categories:**
```typescript
PUBLIC_ROUTES = ["/", "/auth", "/unauthorized"]
CUSTOMER_ONLY_ROUTES = ["/customer"]
OWNER_ONLY_ROUTES = ["/owner"]
SHARED_ROUTES = ["/dashboard", "/orders", "/profile"]
```

**Flow:**
1. Check if route is public → Allow access
2. Check if route requires authentication
3. Verify JWT token exists and is valid
4. Extract user role from token
5. Enforce role-based access control
6. Add user info to headers for downstream use

**Headers Added by Middleware:**
- `x-user-id`: User's unique identifier
- `x-user-email`: User's email address
- `x-user-role`: User's role (owner/manager/worker/customer)

#### Auth Actions (`src/app/auth/actions.ts`)

Server actions that handle authentication logic.

**FormState Interface:**
```typescript
interface FormState {
  error: string | null;
  isReg: boolean;
  isLoading: boolean;
  fieldErrors?: {
    email?: string;
    password?: string;
    name?: string;
    phone?: string;
    confirmPassword?: string;
  };
}
```

**Functions:**
- `authUser()` - Main action that handles both login and registration
- `handleRegister()` - Processes registration and sets auth cookie
- `handleLogin()` - Processes login and sets auth cookie
- `setAuthCookie()` - Sets the `auth-token` HTTP-only cookie

**Validation:**
- Email must be valid format
- Password must be at least 8 characters
- Name required for registration
- Phone required for registration
- Password confirmation must match

#### Auth Page (`src/app/auth/page.tsx`)

Client component that provides the login/registration UI.

**Features:**
- Toggle between login and registration modes
- Role selector for registration (customer/company)
- Field-level error highlighting
- Loading states during submission
- Automatic redirect to dashboard on success

## Pages

### 1. Customer Page (`/customer`)

**File:** `src/app/customer/page.tsx`

**Access:** Customers only

**Features:**
- Customer-specific dashboard (plain HTML)
- Order management quick links
- Profile settings access
- Payment method management
- Displays user information

**Middleware Check:**
```typescript
if (isCustomerRoute && payload.role !== "customer") {
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}
```

### 2. Owner Page (`/owner`)

**File:** `src/app/owner/page.tsx`

**Access:** Owners only

**Features:**
- Revenue statistics (plain HTML)
- Active jobs overview
- Team member management
- Quick action buttons
- Recent activity table
- Business-specific metrics

**Middleware Check:**
```typescript
if (isOwnerRoute && payload.role !== "owner") {
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}
```

### 3. Dashboard Page (`/dashboard`)

**File:** `src/app/dashboard/page.tsx`

**Access:** Both customers and owners

**Features:**
- Shared overview area (plain HTML)
- Recent activity summary
- Notifications panel
- Quick actions section
- Role-agnostic interface

**Middleware Check:**
```typescript
const allowedRoles: UserRole[] = ["customer", "owner"];
if (!allowedRoles.includes(payload.role)) {
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}
```

## Error Handling

### Field-Level Validation

The auth form displays errors at the field level:

```tsx
{state?.fieldErrors?.email && (
  <p>
    {state.fieldErrors.email}
  </p>
)}
```

### General Errors

General errors are displayed in a simple div:

```tsx
{state?.error && <div>{state.error}</div>}
```

### Unauthorized Access

Users without proper permissions are redirected to `/unauthorized` which displays:
- Clear access denied message
- Link to dashboard
- Link to login page
- List of available pages by role

## API Routes

### Get Current User (`/api/user/me`)

**Method:** `GET`

**Purpose:** Fetch current user information

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "role": "customer"
}
```

**Implementation:** Reads user info from headers set by middleware

### Logout (`/api/auth/logout`)

**Method:** `POST`

**Purpose:** Clear authentication cookie

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

## Authentication Flow

### Registration Flow

```
1. User fills registration form
2. Form submits to authUser() server action
3. Field validation performed
4. Request sent to backend /user/register
5. Backend creates user and returns JWT
6. JWT stored in HTTP-only cookie
7. User redirected to /dashboard
```

### Login Flow

```
1. User fills login form
2. Form submits to authUser() server action
3. Request sent to backend /user/login
4. Backend validates credentials and returns JWT
5. JWT stored in HTTP-only cookie
6. User redirected to /dashboard
```

### Protected Route Access

```
1. User navigates to protected route (e.g., /customer)
2. Middleware intercepts request
3. Checks for auth-token cookie
4. Verifies JWT signature and expiration
5. Extracts user role from token
6. Validates role against route requirements
7. If valid: Adds user headers and allows access
8. If invalid: Redirects to /auth or /unauthorized
```

## Testing Access Control

### Test Customer Access

1. Register/login as customer
2. Navigate to `/customer` → ✅ Access granted
3. Navigate to `/owner` → ❌ Redirected to `/unauthorized`
4. Navigate to `/dashboard` → ✅ Access granted

### Test Owner Access

1. Register/login as owner
2. Navigate to `/customer` → ❌ Redirected to `/unauthorized`
3. Navigate to `/owner` → ✅ Access granted
4. Navigate to `/dashboard` → ✅ Access granted

### Test Unauthenticated Access

1. Clear cookies or open incognito
2. Navigate to `/customer` → ❌ Redirected to `/auth`
3. Navigate to `/owner` → ❌ Redirected to `/auth`
4. Navigate to `/dashboard` → ❌ Redirected to `/auth`
5. Navigate to `/auth` → ✅ Access granted

## Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
JWT_SECRET=your-secret-key-here
```

### Backend (.env)

```env
JWT_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

**Important:** The `JWT_SECRET` must match between frontend and backend for token verification.

## Security Considerations

1. **HTTP-Only Cookies**: JWT stored in HTTP-only cookies prevents XSS attacks
2. **Secure Flag**: Cookies use `secure: true` in production
3. **SameSite**: Cookies use `sameSite: 'lax'` to prevent CSRF
4. **Password Hashing**: Backend uses bcrypt with 12 rounds
5. **Token Expiration**: JWT tokens expire after 7 days
6. **Role Validation**: Middleware validates role on every request

## Future Enhancements

1. **Refresh Tokens**: Implement refresh token rotation
2. **Email Verification**: Add email verification flow
3. **Password Reset**: Add password reset functionality
4. **Session Management**: Allow users to view and revoke active sessions
5. **Two-Factor Auth**: Add 2FA support for enhanced security
6. **OAuth Integration**: Support social login providers
7. **Rate Limiting**: Add rate limiting to auth endpoints
8. **Audit Logging**: Log authentication events for security monitoring