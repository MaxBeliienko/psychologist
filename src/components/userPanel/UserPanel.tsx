import NotLoginUserPanel from './notLoginUserPanel/NotLoginUserPanel';
import LoginUserPanel from './loginUserPanel/LoginUserPanel';
import { UserBasicInfo } from '../../types';

interface OpenModalFunction {
  (type: 'login' | 'register'): void;
}

interface UserPanelProps {
  isOpen: OpenModalFunction;
  user: UserBasicInfo | null;
}

const UserPanel: React.FC<UserPanelProps> = ({ isOpen, user }) => {
  return (
    <div>
      {user ? (
        <LoginUserPanel user={user} />
      ) : (
        <NotLoginUserPanel isOpen={isOpen} />
      )}
    </div>
  );
};

export default UserPanel;
