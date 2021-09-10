import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import './App.scss';
import FirstPage from './FirstPage/FirstPage';
import NotFound from './shared/NotFound';
import Connect from './shared/Connect';

const App = (): JSX.Element => {
  Connect();
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Router>
          <Switch>
            <Route path="/lobby">
              <Lobby />
            </Route>
            <Route path="/game">game</Route>
            <Route path="/result">result</Route>
            <Route exact path="/">
              <FirstPage />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </main>
      <Footer />
    </div>
  );
};
export default App;
