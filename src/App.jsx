import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import LoveLetter from './pages/LoveLetter';
import Surprise from './pages/Surprise';
import Navbar from './components/Navbar';
import MusicPlayer from './components/MusicPlayer';
import Loader from './components/Loader';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import BirthdayOnly from './pages/BirthdayOnly';
import ProtectedRoute from './auth/ProtectedRoute';

function MainLayout() {
  return (
    <>
      <MusicPlayer />
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for suspense/assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans overflow-x-hidden">
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
    </div>
  );
}

export default App;
