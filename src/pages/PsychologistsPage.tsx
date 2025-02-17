import { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '../firebaseConfig';
import PsychologistList from '../components/psychologistList/PsychologistList';
import SortDropdown from '../components/sortDropdown/SortDropdown';
import { Psychologist } from '../types';

const PsychologistsPage: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [sortBy, setSortBy] = useState<keyof Psychologist>('name'); // Замінили на keyof Psychologist
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const getPsychologists = async () => {
    const psychologistsRef = ref(database, 'psychologists');
    try {
      const snapshot = await get(psychologistsRef);
      if (snapshot.exists()) {
        const data = Object.entries(snapshot.val()).map(([key, value]) => ({
          ...(value as Psychologist),
          id: key,
        }));
        setPsychologists(data);
      } else {
        console.log('No psychologists found');
        setPsychologists([]);
      }
    } catch (error) {
      console.log('Error fetching psychologists:', error);
      setPsychologists([]);
    }
  };

  useEffect(() => {
    getPsychologists();
  }, []);

  const sortPsychologists = (
    list: Psychologist[],
    sortBy: keyof Psychologist, // Типізуємо параметр sortBy як ключі з Psychologist
    order: 'asc' | 'desc'
  ) => {
    return [...list].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
    });
  };

  // Сортований список
  const sortedPsychologists = sortPsychologists(psychologists, sortBy, order);

  return (
    <div style={{ position: 'relative' }}>
      <SortDropdown
        onSelect={(sortBy, order) => {
          setSortBy(sortBy as keyof Psychologist); // Типізуємо тут
          setOrder(order);
        }}
      />

      <PsychologistList psychologists={sortedPsychologists} />
    </div>
  );
};

export default PsychologistsPage;
