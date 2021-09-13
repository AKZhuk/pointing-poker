import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { GameRole, IRootState } from '../../types';
import Issues from '../shared/Issues/Issues';
import Members from '../shared/Members/Members';
import Title from '../shared/Title';
import GameSettings from './GameSettings';
import UserMenu from './UserMenu';
import './Lobby.scss';
import { saveLoginInfo } from '../../helpers/helpers';

const Lobby = (): JSX.Element => {
  const { room, user } = useSelector((state: IRootState) => state);
  saveLoginInfo(user, room);
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
