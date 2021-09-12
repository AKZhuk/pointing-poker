import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FirstPage from './FirstPage/FirstPage';
import Lobby from './Lobby/Lobby';
import Game from './Game/Game';
import Result from './Result/Result';
import NotFound from './shared/NotFound';
import Header from './shared/Header/Header';
import Footer from './shared/Footer/Footer';
import './App.scss';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Router>
          <Switch>
            <Route path="/lobby" component={Lobby} />
            <Route path="/game" component={Game} />
            <Route path="/result" component={Result} />
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
