import { useSelector } from 'react-redux';
import { GameRole, IRootState } from '../../types';
import Issues from '../shared/Issues/Issues';
import Members from '../shared/Members/Members';
import Title from '../shared/Title';
import GameSettings from './GameSettings';
import UserMenu from './UserMenu';
import Chat from './Chat/Chat';
import './Lobby.scss';

const Lobby = (): JSX.Element => {
  const { user } = useSelector((state: IRootState) => state);
  return (
    <>
      <Title text="Lobby" variant="h3" align="center" />
      <div className="lobby">
        <div className="row">
          <div className="lobby__main">
            <UserMenu />
            <Members />
          </div>
          <Chat />
        </div>

        {user.role === GameRole.scrumMaster && (
          <>
            <section>
              <Title text="Issues:" variant="h5" align="left" />
              <Issues className="card-container" />
            </section>
            <GameSettings />
          </>
        )}
      </div>
    </>
  );
};
//
export default Lobby;
