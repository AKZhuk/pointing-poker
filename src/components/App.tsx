import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import FirstPage from './FirstPage/FirstPage';
import NotFound from './shared/NotFound';
import Game from './Game/Game';
import GameResult from './Game/GameResult';
import Footer from './Footer/Footer';
import Connect from './shared/Connect';
import './App.scss';

const App = (): JSX.Element => {
  Connect();
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Router>
          <Switch>
            <Route path="/lobby" component={Lobby} />
            <Route path="/game" component={Game} />
            <Route path="/result" component={GameResult} />
            <Route exact path="/" component={FirstPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </main>
      <Footer />
    </div>
  );
};
export default App;
