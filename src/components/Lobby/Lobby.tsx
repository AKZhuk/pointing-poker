import { useSelector } from 'react-redux';
import { GameRole, IRootState } from '../../types';
import GameSettings from '../GameSettings/GameSettings';
import Issues from '../Issues/Issues';
import Members from '../Members/Members';
import UserMenu from '../UserMenu/UserMenu';

const Lobby = (): JSX.Element => {
  const user = useSelector((state: IRootState) => state.user.user);
  return (
    <div className="wrapper">
      <UserMenu />
      <Members />
      {user.role === GameRole.scrumMaster ? (
        <>
          <Issues />
          <GameSettings />
        </>
      ) : null}
    </div>
  );
};

export default Lobby;
