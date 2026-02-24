# Component API Reference

## Common Components

### Button
```jsx
import Button from './components/common/Button';

<Button 
  variant="primary"      // primary, secondary, outline, ghost, danger
  size="md"             // sm, md, lg
  loading={false}       // shows spinner
  icon={<Icon />}       // optional icon
  iconPosition="left"   // left, right
  fullWidth={false}     // stretch to full width
  disabled={false}
  onClick={() => {}}
>
  Button Text
</Button>
```

### InputField
```jsx
import InputField from './components/common/InputField';

<InputField
  label="Email Address"
  type="email"
  icon={<Mail size={18} />}
  placeholder="name@example.com"
  error="Error message"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  required
/>
```

### StatusBadge
```jsx
import StatusBadge from './components/common/StatusBadge';

<StatusBadge
  variant="success"     // success, warning, danger, info, neutral
  size="md"            // sm, md, lg
  dot={true}           // shows animated dot
>
  Badge Text
</StatusBadge>
```

### LoadingSpinner
```jsx
import LoadingSpinner from './components/common/LoadingSpinner';

<LoadingSpinner
  size="md"            // sm, md, lg, xl
  text="Loading..."    // optional text
  fullScreen={false}   // overlay entire screen
/>
```

## Data Display Components

### ProfessionalCard
```jsx
import ProfessionalCard from './components/data-display/ProfessionalCard';

<ProfessionalCard
  professional={{
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Senior UX Architect",
    category: "Design",
    rating: 4.9,
    reviews: 247,
    hourlyRate: 150,
    avatar: "https://...",
    skills: ["UI/UX", "Research", "Prototyping"],
    verified: true
  }}
/>
```

### StatsCard
```jsx
import StatsCard from './components/data-display/StatsCard';

<StatsCard
  label="Total Revenue"
  value="$42,580"
  trend="+18%"
  trendDirection="up"   // up, down
  icon={<DollarSign size={20} />}
  color="emerald"      // indigo, emerald, amber, rose, purple
/>
```

## Layout Components

### Navbar
```jsx
import Navbar from './components/layout/Navbar';

<Navbar
  title="ServiceHub"
  tabs={['Browse', 'Saved', 'Bookings']}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>
```

## Hooks

### useAuth
```jsx
import { useAuth } from './hooks/useAuth';

const { user, login, logout, updateUser, isAuthenticated } = useAuth();

// Login
await login({
  id: '1',
  email: 'user@example.com',
  fullName: 'John Doe',
  role: 'user',
  avatar: 'https://...'
});

// Logout
logout();

// Update user
updateUser({ fullName: 'Jane Doe' });
```

### useFetch
```jsx
import { useFetch } from './hooks/useFetch';

const { data, loading, error } = useFetch('/api/users');

if (loading) return <LoadingSpinner />;
if (error) return <div>Error: {error}</div>;
return <div>{JSON.stringify(data)}</div>;
```

## Services

### userService
```javascript
import { userService } from './services/userService';

// Login
const user = await userService.login(email, password);

// Register
await userService.register({ fullName, email, password });

// Get current user
const currentUser = await userService.getCurrentUser();

// Update profile
await userService.updateProfile(userId, { fullName: 'New Name' });
```

### bookingService
```javascript
import { bookingService } from './services/bookingService';

// Get bookings
const bookings = await bookingService.getBookings(userId);

// Create booking
const result = await bookingService.createBooking({
  professionalId: 1,
  service: 'Consultation',
  date: '2026-03-01',
  time: '10:00 AM',
  amount: 150
});

// Update booking
await bookingService.updateBooking(bookingId, { status: 'confirmed' });

// Cancel booking
await bookingService.cancelBooking(bookingId);
```

## Utilities

### formatCurrency
```javascript
import { formatCurrency, formatCompactCurrency } from './utils/formatCurrency';

formatCurrency(1234.56);        // "$1,234.56"
formatCurrency(1234.56, 'EUR'); // "€1,234.56"
formatCompactCurrency(1500);    // "$1.5K"
formatCompactCurrency(1500000); // "$1.5M"
```

### formatDate
```javascript
import { formatDate, getTimeAgo } from './utils/formatDate';

formatDate('2026-02-24');              // "Feb 24, 2026"
formatDate('2026-02-24', 'long');      // "February 24, 2026"
formatDate('2026-02-24', 'time');      // "10:30 AM"
getTimeAgo('2026-02-24T10:00:00Z');    // "2h ago"
```

## Context

### AuthContext
```jsx
import { AuthProvider } from './context/authContext';

// Wrap your app
<AuthProvider>
  <App />
</AuthProvider>

// Use anywhere
import { useAuth } from './hooks/useAuth';
const { user, login, logout } = useAuth();
```

## Toast Notifications

```jsx
import { toast } from 'sonner';

// Success
toast.success('Operation successful!', {
  description: 'Your changes have been saved'
});

// Error
toast.error('Something went wrong', {
  description: 'Please try again later'
});

// Info
toast.info('New message received');

// Warning
toast.warning('Please verify your email');
```

## Animations

```jsx
import { motion } from 'motion/react';

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>

// Slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>

// Scale
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Click me
</motion.button>

// Layout animation
<motion.div layoutId="unique-id">
  Content
</motion.div>
```

## CSS Classes

### Common Patterns

```css
/* Gradient backgrounds */
.gradient-primary {
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
}

.gradient-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

/* Shadows */
.shadow-soft {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
}

.shadow-hard {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

/* Transitions */
.smooth-transition {
  transition: all 0.3s ease;
}

/* Hover effects */
.hover-lift:hover {
  transform: translateY(-4px);
}
```

## Routing Pattern (Optional)

If you add React Router:

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          user ? <Dashboard /> : <Navigate to="/login" />
        } />
        
        <Route path="/professionals" element={<BrowseProfessionals />} />
        <Route path="/bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=ServiceHub
VITE_ENABLE_ANALYTICS=false
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Best Practices

### Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  // 1. Hooks
  const [state, setState] = useState(null);

  // 2. Effects
  useEffect(() => {
    // side effects
  }, []);

  // 3. Handlers
  const handleClick = () => {
    setState('new value');
  };

  // 4. Render
  return (
    <div className="component-name">
      {/* Content */}
    </div>
  );
};

export default ComponentName;
```

### Service Pattern
```javascript
// services/myService.js
import api from './api';

export const myService = {
  async getData() {
    return await api.get('/endpoint');
  },

  async createData(data) {
    return await api.post('/endpoint', data);
  }
};
```

### Custom Hook Pattern
```javascript
// hooks/useCustomHook.js
import { useState, useEffect } from 'react';

export const useCustomHook = (param) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // logic
  }, [param]);

  return { data };
};
```

---

**Complete API reference for all components and utilities**
