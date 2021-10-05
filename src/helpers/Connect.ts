import { useDispatch, useSelector } from 'react-redux';
import { RECONNECT_TIMEOUT, WSMethods } from './constants';
import { addRoom, setNotification, setRoom } from '../redux/reducers/room/roomActions';
import { setConnection } from '../redux/reducers/connection/connectionActions';
import { defaultRoomState } from '../redux/reducers/room/roomReducer';
import { IRootState, PopUpNames, GameRole } from '../types';
import { creatLinkFromKey } from './helpers';
import { setFeature, resetVoting } from '../redux/reducers/features/featuresActions';
import { setOpen } from '../redux/reducers/popUp/popUpActions';

export const socket = new WebSocket(`wss://${process.env.BASE_URL}`);

const keepAlive = () => {
  if (socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify({ method: WSMethods.reconnect }));
  }
  setTimeout(keepAlive, RECONNECT_TIMEOUT);
  console.log('Reconnect');
};

export const Connect = (): void => {
  const dispatch = useDispatch();
  const { kickVoting, askForJoinMemberPopUp } = PopUpNames;
  const { user } = useSelector((state: IRootState) => state);
  const { isVoted } = useSelector((state: IRootState) => state.features);

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
        if (!res.roomKey) {
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
        break;
      case WSMethods.addChatMessage:
        dispatch(setRoom('chatMessages', res.data));
        break;
      case WSMethods.changeRoute:
        dispatch(setRoom('route', res.data));
        break;
      case WSMethods.removeMember:
        if (user.id === res.data) {
          dispatch(addRoom(defaultRoomState));
        }
        break;
      case WSMethods.updateGame:
        dispatch(setRoom('game', res.data));
        break;
      case WSMethods.startKickUserVoting:
        if (!isVoted && user.id !== res.data.id) {
          dispatch(setFeature('kickMember', res.data));
        }
        break;
      case WSMethods.resetKickUserVoting:
        dispatch(resetVoting());
        dispatch(setOpen(kickVoting, false));
        break;
      case WSMethods.attachmentMemberRequest:
        if (user.role === GameRole.scrumMaster) {
          dispatch(setFeature('candidate', res.data));
          dispatch(setOpen(askForJoinMemberPopUp, true));
        }
        break;
      case WSMethods.showNotification:
        dispatch(setNotification(res.data));
        break;
      default:
        console.error(`Неизвестный ивент`);
    }
  };
  socket.onclose = () => {
    console.log('Websocket closed');
  };

  socket.onerror = () => {
    console.log('Что-то пошло не так!');
  };
};
