import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { IssueDetailsProps } from '../../../types';
import Title from '../Title';

const IssueDetails = ({ issue, popUpName }: IssueDetailsProps): JSX.Element => {
  const dispatch = useDispatch();
  const handleOKButton = () => {
    dispatch(setOpen(popUpName, false));
  };

  return (
    <>
      <Title text={`${issue?.title}`} variant="h3" align="center" />
      <Grid container direction="column" justifyContent="space-around" alignItems="flex-start">
        <div className="card-text">
          <strong>URL</strong>: {issue?.link}
        </div>
        <div className="card-text">
          <strong>Priority</strong>: {issue?.priority}
        </div>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Button variant="contained" color="primary" onClick={handleOKButton}>
          OK
        </Button>
      </Grid>
    </>
  );
};

export default IssueDetails;
