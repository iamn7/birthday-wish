import { Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import ProtectedRoute from './auth/ProtectedRoute';

// Lazy load all pages for faster initial load
const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./pages/Timeline'));
const LoveLetter = lazy(() => import('./pages/LoveLetter'));
const Surprise = lazy(() => import('./pages/Surprise'));
const Login = lazy(() => import('./pages/Login'));
const BirthdayOnly = lazy(() => import('./pages/BirthdayOnly'));

function MainLayout() {
  return (
    <>
      <MusicPlayer />
      <Navbar />
      <Outlet />
    </>
  );
}

// Mini fallback for Suspense during route transitions
function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
      <div className="w-10 h-10 border-t-2 border-pink-500 rounded-full animate-spin" />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reduced from 2500ms → 1200ms for faster perceived load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/birthday" element={<BirthdayOnly />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/letter" element={<LoveLetter />} />
              <Route path="/surprise" element={<Surprise />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
