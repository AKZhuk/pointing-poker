import { Button, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './Footer/Footer';
import Header from './Header/Header';

import { setUser } from '../redux/reducers/user/userActions';
import PopUp from './shared/PopUp';
import ConnectToLobby from './ConnectToLobby/ConnectToLobby';
import './App.scss';
import { setOpen } from '../redux/reducers/popUp/popUpActions';
import { PopUpNames } from '../types';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const handleOpen = (popUpName: keyof typeof PopUpNames) => {
    dispatch(setOpen(popUpName, true));
  };

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
        <TextField id="standard-basic" label="Standard" />

        <Button variant="contained" color="primary" onClick={() => handleOpen('ConnectToLobbyPopUp')}>
          ConnectToLobbyPopUp
        </Button>
        <PopUp content={<ConnectToLobby />} name="ConnectToLobbyPopUp" />
      </main>
      <Footer />
    </div>
  );
};
export default App;
