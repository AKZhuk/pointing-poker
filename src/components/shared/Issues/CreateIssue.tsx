import {
  Button,
  Container,
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { idGenerator } from '../../../helpers/helpers';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { IIssue, IRootState } from '../../../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 200,
    },
    menuItem: {
      minWidth: 200,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    gridContainer: {
      paddingTop: theme.spacing(5),
    },
  }),
);

const CreateIssue = ({ oldIssue }: { oldIssue?: IIssue }): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    room: { roomKey },
  } = useSelector((state: IRootState) => state);
  const [titleDirty, setTitleDirty] = useState(false);
  const [titleError, setTitleError] = useState(' ');
  const [formValid, setFormValid] = useState(false);
  const errorMessage = titleDirty && titleError ? titleError : ' ';
  const isValidationError = !!(titleDirty && titleError.length > 1);
  const [issue, setIssue] = useState({
    id: oldIssue ? oldIssue.id : idGenerator(),
    title: oldIssue ? oldIssue.title : '',
    link: oldIssue ? oldIssue.link : '',
    priority: oldIssue ? oldIssue.priority : 'Low',
  });
  useEffect(() => {
    if (!isValidationError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [titleError, isValidationError]);

  const validateInput = (inputName: string, value: string) => {
    if (inputName === 'title' && value.length > 0) {
      setTitleError(' ');
    } else if (inputName === 'title' && value.length === 0) {
      setTitleError('Поле не может быть пустым');
    }
  };

  const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const name = event.target.name as keyof typeof issue;
    const value = event.target.value as string;
    setIssue({ ...issue, [name]: value });
    validateInput(name, value);
  };

  const handleNoButton = (): void => {
    if (oldIssue) dispatch(setOpen('ChangeIssuePopUp', false));
    else dispatch(setOpen('CreateIssuePopUp', false));
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (issue.title.length > 0) {
      if (oldIssue) {
        SendWSMessage('changeIssue', roomKey, { issue, id: oldIssue.id });
        dispatch(setOpen('ChangeIssuePopUp', false));
      } else {
        SendWSMessage('addIssue', roomKey, issue);
        dispatch(setOpen('CreateIssuePopUp', false));
      }
    } else {
      validateInput('title', '');
    }
  };

  const blurHandler = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case 'title':
        setTitleDirty(true);
        break;
      default:
        setTitleDirty(false);
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <Typography variant="h5" gutterBottom>
        {oldIssue ? `Change Issue` : `Create Issue`}
      </Typography>
      <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              error={isValidationError}
              autoComplete="off"
              name="title"
              label="Title"
              helperText={errorMessage}
              value={issue.title}
              onChange={handleChange}
              fullWidth
              required
              onBlur={blurHandler}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              name="link"
              label="link"
              value={issue.link}
              onChange={handleChange}
              fullWidth
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                labelId="priority"
                id="priority-select"
                name="priority"
                value={issue.priority}
                onChange={handleChange}
                autoWidth
              >
                <MenuItem className={classes.menuItem} value="Low">
                  Low
                </MenuItem>
                <MenuItem className={classes.menuItem} value="Middle">
                  Middle
                </MenuItem>
                <MenuItem className={classes.menuItem} value="Hight">
                  Hight
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid
          container
          className={classes.gridContainer}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Button variant="contained" color="primary" type="submit" disabled={formValid}>
              Yes
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="secondary" onClick={handleNoButton}>
              No
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateIssue;
