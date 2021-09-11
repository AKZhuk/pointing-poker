import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { GameRole, IRootState } from '../../types';
import GameSettings from '../GameSettings/GameSettings';
import Issues from '../Issues/Issues';
import Members from '../Members/Members';
import Title from '../shared/Title';
import UserMenu from '../UserMenu/UserMenu';

const Lobby = (): JSX.Element => {
  const {
    room,
    user: { user },
  } = useSelector((state: IRootState) => state);

  return (
    <div className="wrapper">
      <Title text="Lobby" variant="h3" align="center" />
      <Switch>{room === null && <Redirect to="/" />}</Switch>
      <UserMenu />
      <Members />
      {user.role === GameRole.scrumMaster && (
        <>
          <Title text="Issues:" variant="h5" align="left" />
          <div className="card-container">
            <Issues />
          </div>
          <GameSettings />
        </>
      )}
    </div>
  );
};

export default Lobby;
