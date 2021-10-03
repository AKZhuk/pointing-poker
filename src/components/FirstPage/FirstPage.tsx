import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Img } from 'react-image';
import { useDispatch } from 'react-redux';
import { ChangeEvent, useEffect, useState } from 'react';
import { setConnection } from '../../redux/reducers/connection/connectionActions';
import { setUser } from '../../redux/reducers/user/userActions';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import ConnectToLobby from '../Lobby/ConnectToLobby';
import { getRoomKeyFromURL, idGenerator, validateURL } from '../../helpers/helpers';
import { checkRoom } from '../../helpers/HttpServerApi';
import PopUp from '../shared/PopUp';
import LoginDenied from '../shared/LoginDenied';
import Title from '../shared/Title';
import { GameRole, PopUpNames } from '../../types';
import firstPageLogo from '../../assets/img/poker-discussion.png';
import './FirstPage.scss';

const FirstPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { ConnectToLobbyPopUp, LoginDeniedPopUp } = PopUpNames;
  const { scrumMaster, player } = GameRole;
  const [Url, setUrl] = useState('');
  const [urlDirty, setUrlDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState(' ');
  const isValidationError = !!(urlDirty && errorMessage.length > 1);

  useEffect(() => {
    const url = validateURL() ? window.location.href : '';
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

  const connectButtonHandler = async () => {
    setUserRole(player);
    if (validateURL(Url)) {
      const result = await checkRoom(getRoomKeyFromURL(Url));
      if (result) {
        handleOpen(ConnectToLobbyPopUp);
        dispatch(setConnection('url', Url));
      } else setErrorMessage('Указанная комната не существует');
    } else {
      setErrorMessage('Не верный формат URL');
    }
  };

  return (
    <>
      <div className="firstPage" data-testid="FirstPage-test">
        <Img
          className="firstPage__logo"
          src={firstPageLogo}
          loader={<Skeleton variant="rect" className="firstPage__logo" height={404} animation="wave" />}
          unloader={<Skeleton variant="rect" className="firstPage__logo" height={404} animation="wave" />}
          width="500"
          height="auto"
          alt="logo-404"
        />
        <Container>
          <Title variant="h3" text="Start your planning:" align="left" />
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
        <Box marginTop={2} marginBottom={2}>
          <Title variant="h3" text="Or:" align="left" />
          <Box marginBottom={3}>
            <Typography variant="overline" align="center" gutterBottom>
              Connect to lobby by URL:
            </Typography>
          </Box>
          <Box marginLeft={5} marginRight={5} display="inline" className="firstPage__link-wrapper">
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
      <PopUp name={ConnectToLobbyPopUp}>
        <ConnectToLobby />
      </PopUp>
      <PopUp name={LoginDeniedPopUp}>
        <LoginDenied />
      </PopUp>
    </>
  );
};

export default FirstPage;
