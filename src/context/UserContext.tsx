import { createContext, useContext } from 'react';
import { UserBasicInfo } from '../types';

interface UserContextType {
  user: UserBasicInfo | null;
}

export const UserContext = createContext<UserContextType>({ user: null });

export const useUser = () => useContext(UserContext);
