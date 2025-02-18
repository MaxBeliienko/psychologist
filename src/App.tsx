import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Suspense, lazy, useEffect, useState } from 'react';
import Header from './components/header/Header';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { UserBasicInfo } from './types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const PsychologistPage = lazy(() => import('./pages/PsychologistsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const userBasicInfo: UserBasicInfo | null = user
    ? {
        displayName: user.displayName,
        email: user.email,
      }
    : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header user={userBasicInfo} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologist" element={<PsychologistPage />} />
        <Route
          path="/favorites"
          element={user ? <FavoritesPage /> : <Navigate to="/" />}
        />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Suspense>
  );
}

export default App;
