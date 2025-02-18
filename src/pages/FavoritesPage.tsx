import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { Psychologist } from '../types';
import PsychologistList from '../components/psychologistList/PsychologistList';

const FavoritesPage = () => {
  const [favoritePsychologists, setFavoritePsychologists] = useState<
    Psychologist[]
  >([]);

  useEffect(() => {
    const fetchFavoritePsychologists = async () => {
      const favorites = JSON.parse(
        localStorage.getItem('favorites') || '[]'
      ) as string[];

      if (favorites.length === 0) {
        setFavoritePsychologists([]);
        return;
      }

      const psychologistsRef = ref(database, 'psychologists');
      try {
        const snapshot = await get(psychologistsRef);
        if (snapshot.exists()) {
          const allPsychologists: Psychologist[] = Object.entries(
            snapshot.val()
          ).map(([key, value]) => ({
            ...(value as Psychologist),
            id: key,
          }));

          const filteredPsychologists = allPsychologists.filter(psychologist =>
            favorites.includes(psychologist.id)
          );

          setFavoritePsychologists(filteredPsychologists);
        } else {
          setFavoritePsychologists([]);
        }
      } catch (error) {
        console.error('Error fetching psychologists:', error);
        setFavoritePsychologists([]);
      }
    };

    fetchFavoritePsychologists();
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favoritePsychologists.length === 0 ? (
        <p>No favorite psychologists yet.</p>
      ) : (
        <PsychologistList psychologists={favoritePsychologists} />
      )}
    </div>
  );
};

export default FavoritesPage;
