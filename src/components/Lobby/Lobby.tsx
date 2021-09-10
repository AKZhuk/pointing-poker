import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { IRootState } from '../../types';
import GameSettings from '../GameSettings/GameSettings';
import Issues from '../Issues/Issues';
import Members from '../Members/Members';

const Lobby = (): JSX.Element => {
  const room = useSelector((state: IRootState) => state.room);
  return (
    <div className="wrapper">
      <Switch>{room === null && <Redirect to="/" />}</Switch>
      <Members />
      <Issues />
      <GameSettings />
    </div>
  );
};

export default Lobby;
