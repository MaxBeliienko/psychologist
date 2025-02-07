import PsychologistList from '../components/psychologistList/PsychologistList';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useState, useEffect } from 'react';
import { Psychologist } from '../types';

const PsychologistsPage: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[] | null>(
    null
  );
  const getPsychologist = async () => {
    const psychologistsRef = ref(database, 'psychologists');
    try {
      const snapshot = await get(psychologistsRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No psychologists found');
        return null;
      }
    } catch (error) {
      console.log('Error fetching psychologists:', error);
      return null;
    }
  };

  useEffect(() => {
    getPsychologist().then(data => {
      if (data) {
        setPsychologists(data);
      }
    });
  }, []);

  return (
    <div>
      <PsychologistList psychologists={psychologists} />
    </div>
  );
};

export default PsychologistsPage;
