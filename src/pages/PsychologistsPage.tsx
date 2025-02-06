import PsychologistList from '../components/psychologistList/PsychologistList';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import { useState, useEffect } from 'react';

const PsychologistsPage: React.FC = () => {
  const [psychologists, setPsychologists] = useState(null);
  const getPsychologist = async () => {
    const psychologistsRef = ref(database, 'psychologist');
    try {
      const snapshot = await get(psychologistsRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
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
        console.log(data);

        setPsychologists(data);
      }
    });
  }, []);

  return (
    <div>
      <PsychologistList />
    </div>
  );
};

export default PsychologistsPage;
