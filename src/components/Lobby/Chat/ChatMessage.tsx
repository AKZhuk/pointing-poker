import { Avatar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getTimeFromDate, getUserFromRoom } from '../../../helpers/helpers';
import { IRoom, IRootState, IUser } from '../../../types';

const ChatMessage = ({ userid, message, date }: { userid: string; message: string; date: number }): JSX.Element => {
  const currentUser: IUser = useSelector((state: IRootState) => state.user);
  const room: IRoom = useSelector((state: IRootState) => state.room);
  const user = getUserFromRoom(userid, room);
  return (
    <div className={`answer ${currentUser.id === userid ? 'right' : 'left'}`}>
      {user && (
        <>
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
        </>
      )}
    </div>
  );
};

export default ChatMessage;
