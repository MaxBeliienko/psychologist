import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Suspense, lazy } from 'react';
import Header from './components/header/Header';
import { auth } from './firebaseConfig';

const HomePage = lazy(() => import('./pages/HomePage'));
const PsychologistPage = lazy(() => import('./pages/PsychologistsPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/psychologist" element={<PsychologistPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
