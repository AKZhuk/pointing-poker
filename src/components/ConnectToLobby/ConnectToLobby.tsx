import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { setDefaultUser, setUser } from '../../redux/reducers/user/userActions';
import { GameRole, IRootState } from '../../types';
import Switcher from '../shared/Switcher';
import UploadButton from '../shared/UploadButton';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const ConnectToLobby = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { observer, player } = GameRole;
  const { firstName, lastName, jobPostion, urlToImage } = useSelector((state: IRootState) => state.user.user);
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState(' ');
  const [formValid, setFormValid] = useState(false);
  const errorMessage = firstNameDirty && firstNameError ? firstNameError : ' ';
  const isValidationError = !!(firstNameDirty && firstNameError.length > 1);

  useEffect(() => {
    if (!isValidationError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, isValidationError]);

  const validateInput = (inputName: string, value: string) => {
    if (inputName === 'firstName' && value.length > 0) {
      setFirstNameError(' ');
    } else if (inputName === 'firstName' && value.length === 0) {
      setFirstNameError('Имя не может быть пустым');
    }
  };

  const handleTextInputsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputName = e.target.name as 'firstName' | 'lastName' | 'jobPostion';
    dispatch(setUser(inputName, e.target.value));
    validateInput(e.target.name, e.target.value);
  };

  const handleUpdateImage = (imageURL: string): void => {
    dispatch(setUser('urlToImage', imageURL));
  };

  const handleChecked = (isChecked: boolean) => {
    const userRole = !isChecked ? observer : player;
    dispatch(setUser('role', userRole));
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (firstName.length > 0) {
      dispatch(setOpen('isOpen', false));
    } else {
      validateInput('firstName', '');
    }
  };

  const handleCancelButton = (): void => {
    dispatch(setDefaultUser('firstName', ''));
    dispatch(setOpen('isOpen', false));
  };

  const blurHandler = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case 'firstName':
        setFirstNameDirty(true);
        break;
      default:
        setFirstNameDirty(false);
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Connect to lobby
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={isValidationError}
                autoComplete="off"
                name="firstName"
                id="firstName"
                label="First Name"
                helperText={errorMessage}
                value={firstName}
                onChange={handleTextInputsChange}
                fullWidth
                required
                onBlur={blurHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="off"
                value={lastName}
                onChange={handleTextInputsChange}
                helperText=" "
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                label="Job position"
                name="jobPostion"
                autoComplete="off"
                value={jobPostion}
                onChange={handleTextInputsChange}
                helperText=" "
              />
            </Grid>
            <Grid item xs={7}>
              <Box component="div">
                <Typography variant="subtitle1" gutterBottom>
                  Upload Avatar
                </Typography>
                <div className={classes.wrapper}>
                  <Avatar alt={firstName} src={urlToImage} className={classes.avatar} />
                  <UploadButton handleUpdateImage={handleUpdateImage} />
                </div>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <div className={classes.wrapper}>
                <Switcher handleChecked={handleChecked} />
                <Typography variant="subtitle1">Connect as Observer</Typography>
              </div>
            </Grid>
          </Grid>
          <div className={classes.wrapper}>
            <Button variant="contained" color="primary" type="submit" disabled={formValid}>
              Confirm
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelButton}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ConnectToLobby;
