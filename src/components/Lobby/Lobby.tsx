import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { IRootState } from '../../types';
import { GameRole, IRootState } from '../../types';
import GameSettings from '../GameSettings/GameSettings';
import Issues from '../Issues/Issues';
import Members from '../Members/Members';
import UserMenu from '../UserMenu/UserMenu';

const Lobby = (): JSX.Element => {
  const room = useSelector((state: IRootState) => state.room);
  const user = useSelector((state: IRootState) => state.user.user);
  
  return (
    <div className="wrapper">
      <Switch>{room === null && <Redirect to="/" />}</Switch>
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
