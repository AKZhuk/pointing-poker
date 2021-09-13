import { Card, CardContent, Typography, Avatar, IconButton } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { useDispatch, useSelector } from 'react-redux';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { IRootState, IUser, PopUpNames } from '../../../types';
import './Members.scss';

const MemberCard = ({
  member,
  isScrumMaster,
  onKickMember,
}: {
  member: IUser;
  isScrumMaster?: boolean;
  onKickMember?: (firstName: string, lastName: string | undefined, id: string) => void;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { deleteMemberPopUp } = PopUpNames;
  const {
    user: { id },
    room: { roomKey },
  } = useSelector((state: IRootState) => state);

  const handleClick = () => {
    // SendWSMessage('removeMember', roomKey, member);
    if (onKickMember) {
      onKickMember(member.firstName, member.lastName, member.id);
    }
    dispatch(setOpen(deleteMemberPopUp, true));
  };
  return (
    <Card className="card">
      <CardContent className="card-content">
        <Avatar alt="avatar" src={member.urlToImage} className="avatar" />
        <Typography variant="h6" component="h3">
          <Typography variant="caption" display="block" gutterBottom>
            {isScrumMaster && 'Scrum Master'} {id === member.id && `it's you`}
          </Typography>
          {`${member.firstName} ${member.lastName}`}
          <Typography variant="caption" display="block" gutterBottom>
            {member.jobPostion}
          </Typography>
        </Typography>
        {isScrumMaster ? (
          <div>master</div>
        ) : (
          <IconButton onClick={handleClick}>
            <BlockIcon fontSize="large" color="error" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
