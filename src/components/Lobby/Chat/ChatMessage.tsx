import { Avatar, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getTimeFromDate } from '../../../helpers/helpers';
import { IChatMessage, IRootState, IUser } from '../../../types';

const ChatMessage = ({ msg: { userid, urlToAvatar, userName, message, date } }: { msg: IChatMessage }): JSX.Element => {
  const currentUser: IUser = useSelector((state: IRootState) => state.user);
  return (
    <div className={`answer ${currentUser.id === userid ? 'right' : 'left'}`}>
      <>
        <Avatar alt="avatar" className="avatar" src={urlToAvatar} />
        <p className="text">
          <Typography variant="overline" display="block" gutterBottom>
            {userName}
          </Typography>
          {message}
          <Typography variant="overline" display="block" gutterBottom>
            {getTimeFromDate(new Date(date))}
          </Typography>
        </p>
      </>
    </div>
  );
};

export default ChatMessage;
