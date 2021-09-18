import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getTimeFromDate } from '../../helpers/helpers';
import { IRootState, IUser } from '../../types';
import './ChatMessage.scss';

const ChatMessage = ({ user, message, date }: { user: IUser; message: string; date: number }): JSX.Element => {
  const currentUser: IUser = useSelector((state: IRootState) => state.user);
  return (
    <div className={`chatMessage ${currentUser.id === user.id ? 'ownMessage' : ''}  `}>
      <div className="chatMessage__user">
        <Avatar alt="avatar" src={user.urlToImage} />
        <p>{`${user.firstName} :`}</p>
      </div>
      <div className="chatMessage__message">
        {message}
        <p className="chatMessage__time">{getTimeFromDate(new Date(date))}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
