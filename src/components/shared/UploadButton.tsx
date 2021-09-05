import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

const UploadButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label htmlFor="contained-button-file">
        <input accept="image/*" className={classes.input} id="contained-button-file" multiple type="file" />
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </div>
  );
};

export default UploadButton;
