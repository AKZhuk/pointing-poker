import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { GameRole, IRootState } from '../../types';
import Issues from '../shared/Issues/Issues';
import Members from '../shared/Members/Members';
import Title from '../shared/Title';
import GameSettings from './GameSettings';
import UserMenu from './UserMenu';
import Chat from './Chat';
import './Lobby.scss';

const Lobby = (): JSX.Element => {
  const { room, user } = useSelector((state: IRootState) => state);
  return (
    <div className="lobby">
      <div className="wrapper lobby__main">
        <Title text="Lobby" variant="h3" align="center" />
        <Switch>{room === null && <Redirect to="/" />}</Switch>
        <UserMenu />
        <Members />
        {user.role === GameRole.scrumMaster && (
          <>
            <Title text="Issues:" variant="h5" align="left" />
            <Issues className="card-container" />
            <GameSettings />
          </>
        )}
      </div>
      <aside className="wrapper lobby__chat">
        <Chat />
      </aside>
    </div>
  );
};

export default Lobby;
