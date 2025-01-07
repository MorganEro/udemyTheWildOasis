import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyles from './styles/GlobalStyles';
import AppLayout from './ui/AppLayout';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './ui/ProtectedRoute';
import { DarkModeProvider } from './context/darkModeContext/DarkModeProvider';
import React, { Suspense } from 'react';
import Spinner from './ui/Spinner';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Account = React.lazy(() => import('./pages/Account'));
const Bookings = React.lazy(() => import('./pages/Bookings'));
const Cabins = React.lazy(() => import('./pages/Cabins'));
const Login = React.lazy(() => import('./pages/Login'));
const PageNotFound = React.lazy(() => import('./pages/PageNotFound'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Users = React.lazy(() => import('./pages/Users'));
const Booking = React.lazy(() => import('./pages/Booking'));
const CheckIn = React.lazy(() => import('./pages/CheckIn'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route
                  index
                  element={
                    <Navigate
                      replace
                      to="dashboard"
                    />
                  }
                />
                <Route
                  path="dashboard"
                  element={<Dashboard />}
                />
                <Route
                  path="bookings"
                  element={<Bookings />}
                />
                <Route
                  path="bookings/:bookingId"
                  element={<Booking />}
                />
                <Route
                  path="checkIn/:bookingId"
                  element={<CheckIn />}
                />
                <Route
                  path="cabins"
                  element={<Cabins />}
                />
                <Route
                  path="users"
                  element={<Users />}
                />
                <Route
                  path="settings"
                  element={<Settings />}
                />
                <Route
                  path="account"
                  element={<Account />}
                />
              </Route>

              <Route
                path="login"
                element={<Login />}
              />
              <Route
                path="*"
                element={<PageNotFound />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '1rem',
              maxWidth: '500px',
              padding: '1rem 1.5rem',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
