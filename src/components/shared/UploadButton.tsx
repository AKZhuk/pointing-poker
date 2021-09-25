import { ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { IUploadButtonProps } from '../../types';

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

const UploadButton = ({ fileHandler, accept, isDisabled }: IUploadButtonProps): JSX.Element => {
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File = (e.target.files as FileList)[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      fileHandler(reader.result);
    };
    if (file) {
      if (accept === 'image/*') {
        reader.readAsDataURL(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  return (
    <div className={classes.root}>
      <label htmlFor="contained-button-file">
        <input
          accept={accept}
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          disabled={isDisabled}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default UploadButton;
