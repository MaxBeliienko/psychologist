import { useState } from 'react';
import { Psychologist } from '../../types';
import styles from './SortDropdown.module.css';

interface SortDropdownProps {
  onSelect: (sortBy: keyof Psychologist, order: 'asc' | 'desc') => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<string>('name');

  const handleSort = (sortBy: keyof Psychologist, order: 'asc' | 'desc') => {
    onSelect(sortBy, order);
    setCurrentSort(sortBy);
    setIsOpen(false);
  };

  const getSortText = () => {
    switch (currentSort) {
      case 'name':
        return 'Sort by Name';
      case 'price_per_hour':
        return 'Sort by Price';
      case 'rating':
        return 'Sort by Rating';
      default:
        return 'Sort';
    }
  };

  return (
    <div className={styles['sort-dropdown-container']}>
      <span>Filters</span>
      <button onClick={() => setIsOpen(!isOpen)}>{getSortText()}</button>
      {isOpen && (
        <div className={styles['dropdown-wrapper']}>
          <button onClick={() => handleSort('name', 'asc')}>A to Z</button>
          <button onClick={() => handleSort('name', 'desc')}>Z to A</button>
          <button onClick={() => handleSort('price_per_hour', 'asc')}>
            Price ↑
          </button>
          <button onClick={() => handleSort('price_per_hour', 'desc')}>
            Price ↓
          </button>
          <button onClick={() => handleSort('rating', 'asc')}>Rating ↑</button>
          <button onClick={() => handleSort('rating', 'desc')}>Rating ↓</button>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
