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

const UploadButton = (props: IUploadButtonProps): JSX.Element => {
  const { handleUpdateImage } = props;
  const classes = useStyles();
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file: File = (e.target.files as FileList)[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpdateImage(reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={classes.root}>
      <label htmlFor="contained-button-file">
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
      </label>
    </div>
  );
};

export default UploadButton;
