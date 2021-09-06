import GameSettings from '../GameSettings/GameSettings';
import Issues from '../Issues/Issues';
import Members from '../Members/Members';

const Lobby = (): JSX.Element => {
  return (
    <div className="wrapper">
      <Members />
      <Issues />
      <GameSettings />
    </div>
  );
};

export default Lobby;
