import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user/userActions';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import './App.scss';
import FirstPage from './FirstPage/FirstPage';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser('firstName', 'vova'));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <FirstPage />
        <Lobby />
      </main>
      <Footer />
    </div>
  );
};
export default App;
