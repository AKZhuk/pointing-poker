import { Route, Switch } from 'react-router-dom';
import FirstPage from './FirstPage/FirstPage';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Result from './Result/Result';
import NotFound from './shared/NotFound';
import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import './App.scss';
import { Connect } from '../helpers/Connect';

const App = (): JSX.Element => {
  Connect();

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Switch>
          <Route path="/lobby" component={Lobby} />
          <Route path="/game" component={Game} />
          <Route path="/result" component={Result} />
          <Route exact path="/" component={FirstPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};
export default App;
