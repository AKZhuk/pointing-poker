import { Card, CardContent, Typography, Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { IIssue } from '../../types';
import { removeIssue } from '../../redux/reducers/issues/issuesActions';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';

const IssueCard = ({ issue = undefined }: { issue?: IIssue | undefined }): JSX.Element => {
  const dispatch = useDispatch();

  const editHandler = () => {
    console.warn(`edit me ${issue?.title}`);
  };

  const deleteHandler = () => {
    dispatch(removeIssue(issue as IIssue));
  };

  const createHandler = () => {
    dispatch(setOpen('CreateIssuePopUp', true));
  };

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Typography variant="h6" component="h3">
          {issue ? issue.title : 'Create issue'}
          <Typography variant="caption" display="block" gutterBottom>
            {issue?.priority}
          </Typography>
        </Typography>
        {issue ? (
          <Box>
            <IconButton onClick={editHandler}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" color="secondary" onClick={deleteHandler}>
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Box>
        ) : (
          <IconButton onClick={createHandler}>
            <AddIcon fontSize="large" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default IssueCard;
