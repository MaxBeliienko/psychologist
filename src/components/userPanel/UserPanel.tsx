import styles from './UserPanel.module.css';
import { useState } from 'react';
import NotLoginUserPanel from './notLoginUserPanel/NotLoginUserPanel';
import LoginUserPanel from './loginUserPanel/LoginUserPanel';

const UserPanel = () => {
  const [login, setLogin] = useState<boolean>(false);

  return <div>{login ? <LoginUserPanel /> : <NotLoginUserPanel />}</div>;
};

export default UserPanel;
