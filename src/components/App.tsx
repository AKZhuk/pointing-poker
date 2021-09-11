import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import FirstPage from './FirstPage/FirstPage';
import NotFound from './shared/NotFound';
import Game from './Game/Game';
import Result from './Result/Result';
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
            <Route path="/result" component={Result} />
            <Route exact path="/">
              <FirstPage />
              {/* <Lobby /> */}
              {/* <Game /> */}
              {/* <Result /> */}
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </main>
      <Footer />
    </div>
  );
};
export default App;
