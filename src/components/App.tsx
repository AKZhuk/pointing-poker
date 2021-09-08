import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import './App.scss';
import FirstPage from './FirstPage/FirstPage';
import { setConnection } from '../redux/reducers/connection/connectionActions';
import NotFound from './shared/NotFound';

const BASE_URL = 'ws://localhost:5000';
const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const socket = useRef(new WebSocket(BASE_URL));

  const connect = () => {
    socket.current = new WebSocket(BASE_URL);
    socket.current.onopen = () => {
      console.log('Тепленькая пошла!');
      dispatch(setConnection('isLogin', true));
    };
    socket.current.onmessage = (event: MessageEvent) => {
      const message = event.data;
      console.log(`Что-то пришло!${message}`);
    };
    socket.current.onclose = () => {
      console.log('Наши полномочия, так сказать, всё!');
    };
    socket.current.onerror = () => {
      console.log('Что-то пошло не так!');
    };
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Router>
          <Switch>
            <Route path="/lobby">
              {connect()}
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
