import { useHistory } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { RECONNECT_TIMEOUT, WSMethods } from './constants';
import { addRoom, setRoom } from '../redux/reducers/room/roomActions';
import { setConnection } from '../redux/reducers/connection/connectionActions';
import { defaultRoomState } from '../redux/reducers/room/roomReducer';
import { IRootState, PopUpNames, Routes, GameRole } from '../types';
import { creatLinkFromKey } from './helpers';
import { addKickMember, addMemberToRoom, resetVoting } from '../redux/reducers/features/featuresActions';
import { setOpen } from '../redux/reducers/popUp/popUpActions';

export const socket = new WebSocket(`wss://${process.env.BASE_URL}`);

function keepAlive() {
  const timeout = 30000;
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify({ method: '' }));
  }
  const timerId = setTimeout(keepAlive, timeout);
  console.log('Reconnect');
}
export const Connect = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { kickVoting, askForJoinMemberPopUp } = PopUpNames;
  const { user, room } = useSelector((state: IRootState) => state);
  const { isVoted } = useSelector((state: IRootState) => state.features);
  const changeRoute = (route: keyof typeof Routes) => {
    const path = `/${route}`;
    history.push(path);
  };

  socket.onopen = () => {
    dispatch(setConnection('isConnected', true));
    console.log('Connected!');
    keepAlive();
  };

  socket.onmessage = (event: MessageEvent) => {
    const res = JSON.parse(event.data);
    switch (res.method) {
      case WSMethods.login:
        dispatch(setOpen('ConnectToLobbyPopUp', false));
        if (res.roomKey) {
          changeRoute(room.route);
        } else {
          dispatch(setOpen('LoginDeniedPopUp', true));
        }
        break;
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
      case WSMethods.addChatMessage:
        dispatch(setRoom('chatMessages', res.data));
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
      case WSMethods.attachmentMemberRequest:
        if (user.role === GameRole.scrumMaster) {
          dispatch(addMemberToRoom('candidate', res.data));
          dispatch(setOpen(askForJoinMemberPopUp, true));
        }
        break;
      default:
        console.error(`Неизвестный ивент`);
    }
  };
  socket.onclose = () => {
    /* 
    setInterval(() => socket.OPEN, RECONNECT_TIMEOUT); */
  };

  socket.onerror = () => {
    console.log('Что-то пошло не так!');
  };
};
