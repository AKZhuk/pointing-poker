import { Avatar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getTimeFromDate } from '../../../helpers/helpers';
import { IRootState, IUser } from '../../../types';

const ChatMessage = ({ user, message, date }: { user: IUser; message: string; date: number }): JSX.Element => {
  const currentUser: IUser = useSelector((state: IRootState) => state.user);
  return (
    <div className={`answer ${currentUser.id === user.id ? 'right' : 'left'}`}>
      <Avatar alt="avatar" className="avatar" src={user.urlToImage} />
      <p className="text">
        <Typography variant="overline" display="block" gutterBottom>
          {user.firstName}
        </Typography>
        {message}
        <Typography variant="overline" display="block" gutterBottom>
          {getTimeFromDate(new Date(date))}
        </Typography>
      </p>
    </div>
  );
};

export default ChatMessage;
