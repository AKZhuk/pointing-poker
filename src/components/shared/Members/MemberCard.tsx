import { Card, CardContent, Typography, Avatar, IconButton, Badge } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { GameRole, IRootState, IUser, PopUpNames } from '../../../types';
import './Members.scss';

const MemberCard = ({
  member,
  isScrumMaster,
  onKickMember,
}: {
  member: IUser;
  isScrumMaster?: boolean;
  onKickMember?: (member: IUser) => void;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { deleteMemberPopUp } = PopUpNames;
  const {
    user: { id, role },
    room: { members },
  } = useSelector((state: IRootState) => state);

  const handleClick = () => {
    if (onKickMember) {
      onKickMember(member);
    }
    dispatch(setOpen(deleteMemberPopUp, true));
  };

  const isRemovable = () => {
    const playerCount = members.filter((user: IUser) => user.role === GameRole.player).length;
    if (isScrumMaster) {
      return false;
    }
    if (role === GameRole.scrumMaster) {
      return true;
    }
    if (role === GameRole.player && playerCount >= 3 && id !== member.id) {
      return true;
    }
    return false;
  };

  return (
    <Card className="card member" elevation={4}>
      <CardContent className="card-content">
        <Badge
          overlap="circular"
          className="member__avatar"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          <Avatar alt="avatar" src={member.urlToImage} className="avatar ">
            {member.firstName[0] + (member.lastName && member.lastName[0])}
          </Avatar>
        </Badge>
        <Typography variant="h6">
          <Typography variant="caption" display="block" gutterBottom>
            {member.role} {id === member.id && `, it's you`}
          </Typography>
          <div className={`divider ${member.role}`} />
          <Typography variant="h6" component="p" display="block">{`${member.firstName} ${member.lastName}`}</Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {member.jobPostion}
          </Typography>
        </Typography>
        {isRemovable() ? (
          <IconButton onClick={handleClick}>
            <BlockIcon fontSize="large" color="error" />
          </IconButton>
        ) : (
          <div className="abstract-icon" />
        )}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
