import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { setConnection } from '../../redux/reducers/connection/connectionActions';
import firstPageLogo from '../../assets/img/MainLogo.svg';
import PopUp from '../shared/PopUp';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { GameRole, PopUpNames } from '../../types';
import { setUser } from '../../redux/reducers/user/userActions';
import ConnectToLobby from '../Lobby/ConnectToLobby';
import { getRoomKeyFromURL, creatLinkFromKey, idGenerator } from '../../helpers/helpers';

import './FirstPage.scss';

const FirstPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { ConnectToLobbyPopUp } = PopUpNames;
  const { scrumMaster, player } = GameRole;
  const [Url, setUrl] = useState('');
  const [urlDirty, setUrlDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState(' ');
  const isValidationError = !!(urlDirty && errorMessage.length > 1);

  useEffect(() => {
    const url = getRoomKeyFromURL() !== '' ? creatLinkFromKey(getRoomKeyFromURL()) : '';
    setUrl(url);
  }, []);

  const validateInput = (value: string) => {
    if (value.length > 0) {
      setErrorMessage(' ');
    }
  };

  const changeHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    setUrl(ev.target.value);
    validateInput(ev.target.value);
  };

  const handleOpen = (popUpName: keyof typeof PopUpNames) => {
    dispatch(setOpen(popUpName, true));
  };

  const setUserRole = (userRole: keyof typeof GameRole) => {
    dispatch(setUser('id', idGenerator()));
    dispatch(setUser('role', userRole));
  };

  const connectButtonHandler = () => {
    setUserRole(player);
    const isValidURL = getRoomKeyFromURL(Url) !== '';
    if (isValidURL) {
      handleOpen(ConnectToLobbyPopUp);
      dispatch(setConnection('url', Url));
    } else {
      setErrorMessage('Не верный формат URL');
    }
  };

  return (
    <>
      <div className="firstPage" data-testid="FirstPage-test">
        <img className="firstPage__logo" src={firstPageLogo} alt="logo-404" />
        <Container>
          <Box marginBottom={4}>
            <Typography variant="h2" gutterBottom>
              Start your planning:
            </Typography>
          </Box>
          <Typography variant="overline" gutterBottom>
            Create session:
          </Typography>
          <Box display="inline" marginLeft={8}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUserRole(scrumMaster);
                handleOpen(ConnectToLobbyPopUp);
              }}
            >
              Start new game
            </Button>
          </Box>
        </Container>
        <Box marginTop={10}>
          <Box marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              Or:
            </Typography>
          </Box>
          <Typography variant="overline" align="center" gutterBottom>
            Connect to lobby by URL:
          </Typography>
          <Box marginLeft={5} marginRight={5} display="inline">
            <TextField
              name="connect"
              error={isValidationError}
              className="firstPage__link"
              label="Enter URL"
              value={Url}
              onChange={changeHandler}
              onBlur={() => setUrlDirty(true)}
              helperText={errorMessage}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={connectButtonHandler}>
            Connect
          </Button>
        </Box>
      </div>
      <PopUp content={<ConnectToLobby />} name={ConnectToLobbyPopUp} />
    </>
  );
};

export default FirstPage;
