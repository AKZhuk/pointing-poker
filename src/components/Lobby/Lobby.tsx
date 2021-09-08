import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { IRootState } from '../../types';
import GameSettings from '../GameSettings/GameSettings';
import Issues from '../Issues/Issues';
import Members from '../Members/Members';

const Lobby = (): JSX.Element => {
  const { isLogin } = useSelector((state: IRootState) => state.connection);

  return (
    <div className="wrapper">
      <Members />
      <Issues />
      <GameSettings />

      <Switch>{!isLogin && <Redirect to="/" />}</Switch>
    </div>
  );
};

export default Lobby;
