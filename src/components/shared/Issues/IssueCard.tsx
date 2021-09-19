import { Card, CardContent, Typography, Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { IIssue, IRootState } from '../../../types';
import { SendWSMessage } from '../../../helpers/WebSocketApi';

const IssueCard = ({
  issue = undefined,
  editable = false,
  removable = false,
  setEditableIssue,
}: {
  issue?: IIssue | undefined;
  editable?: boolean;
  removable?: boolean;
  setEditableIssue?: Dispatch<SetStateAction<IIssue>>;
}): JSX.Element => {
  const dispatch = useDispatch();
  const {
    room: {
      roomKey,
      game: { activeIssueId },
    },
  } = useSelector((state: IRootState) => state);

  const editHandler = () => {
    if (setEditableIssue) {
      setEditableIssue(issue as IIssue);
    }
    dispatch(setOpen('ChangeIssuePopUp', true));
  };

  return (
    <Card className={activeIssueId === issue?.id ? 'card_active' : 'card'}>
      <CardContent className="card-content">
        <Typography variant="h6" component="h3">
          {issue ? issue.title : 'Create issue'}
          <Typography variant="caption" display="block" gutterBottom>
            {issue?.priority}
          </Typography>
        </Typography>
        <Box>
          {editable && (
            <>
              <IconButton onClick={editHandler}>
                <EditIcon />
              </IconButton>
            </>
          )}
          {removable && (
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={() => SendWSMessage('removeIssue', roomKey, issue)}
            >
              <DeleteOutlineIcon color="error" />
            </IconButton>
          )}
          {!issue && (
            <IconButton onClick={() => dispatch(setOpen('CreateIssuePopUp', true))}>
              <AddIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
