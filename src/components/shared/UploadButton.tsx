import { ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useSelector } from 'react-redux';
import { IRootState, IUploadButtonProps } from '../../types';
import { SERVER_URL, uploadAvatar } from '../../helpers/HttpServerApi';

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
  const userid = useSelector((state: IRootState) => state.user.id);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (accept === 'avatar') {
      const res = await uploadAvatar(e.target, userid);
      if (res.result) fileHandler(`${SERVER_URL}/${res.result}`);
      else console.error(res.error);
    } else {
      const file: File = (e.target.files as FileList)[0];
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        fileHandler(reader.result);
      };
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
