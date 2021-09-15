import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { WSMethods } from './constants';
import { addRoom, setRoom } from '../redux/reducers/room/roomActions';
import { setConnection } from '../redux/reducers/connection/connectionActions';
import { defaultRoomState } from '../redux/reducers/room/roomReducer';
import { IRootState, PopUpNames } from '../types';
import { creatLinkFromKey } from './helpers';
import { addKickMember, resetVoting } from '../redux/reducers/voting/votingActions';
import { setOpen } from '../redux/reducers/popUp/popUpActions';

export const BASE_URL = 'localhost:5000';
const RECONNECT_TIMEOUT = 1000;

export const socket = new WebSocket(`ws://${BASE_URL}`);
export const Connect = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { kickVoting } = PopUpNames;
  const user = useSelector((state: IRootState) => state.user);
  const { isVoted } = useSelector((state: IRootState) => state.kickVote);

  socket.onopen = () => {
    dispatch(setConnection('isConnected', true));
    console.log('Connected!');
  };

  socket.onmessage = (event: MessageEvent) => {
    const res = JSON.parse(event.data);
    switch (res.method) {
      case WSMethods.roomKey:
        dispatch(setRoom('roomKey', res.roomKey));
        dispatch(setConnection('url', creatLinkFromKey(res.roomKey)));
        break;
      case WSMethods.createRoom:
        dispatch(addRoom(res.data));
        break;
      case WSMethods.addMember:
        dispatch(setRoom('members', res.data));
        break;
      case WSMethods.addIssue:
        dispatch(setRoom('issues', res.data));
        break;
      case WSMethods.removeRoom:
        dispatch(addRoom(defaultRoomState));
        history.push('/');
        break;
      case WSMethods.changeRoute:
        dispatch(setRoom('route', res.data));
        history.push(`/${res.data}`);
        break;
      case WSMethods.removeMember:
        if (user.id === res.data) {
          dispatch(addRoom(defaultRoomState));
          history.push('/');
        }
        break;
      case WSMethods.updateGame:
        dispatch(setRoom('game', res.data));
        break;
      case WSMethods.startKickUserVoting:
        if (!isVoted) {
          dispatch(addKickMember('kickMember', res.data));
        }
        break;
      case WSMethods.resetKickUserVoting:
        dispatch(resetVoting(null));
        dispatch(setOpen(kickVoting, false));
        break;
      default:
        console.error(`Неизвестный ивент`);
    }
  };
  socket.onclose = () => {
    setInterval(() => socket.OPEN, RECONNECT_TIMEOUT);
  };
  socket.onerror = () => {
    console.log('Что-то пошло не так!');
  };
};
