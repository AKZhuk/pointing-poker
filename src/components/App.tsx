import { Button, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import './App.scss';
import { setUser } from '../redux/reducers/user/userActions';
import PopUp from './shared/PopUp';
import ConnectToLobby from './ConnectToLobby/ConnectToLobby';

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser('firstName', 'vova'));
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Button variant="contained" color="primary">
          Primary
        </Button>
        <Button variant="contained" color="secondary">
          Secondary
        </Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        {/* <Switcher /> */}
        <TextField id="standard-basic" label="Standard" />
        {/* <UploadButton /> */}
        <PopUp content={<ConnectToLobby />} buttonName="Start New Game" />
      </main>
      <Footer />
    </div>
  );
};
export default App;
