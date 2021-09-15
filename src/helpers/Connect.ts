import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { WSMethods } from './constants';
import { addRoom, setRoom } from '../redux/reducers/room/roomActions';
import { setConnection } from '../redux/reducers/connection/connectionActions';
import { defaultRoomState } from '../redux/reducers/room/roomReducer';
import { IRootState } from '../types';

const BASE_URL = 'localhost:5000';

export const socket = new WebSocket(`ws://${BASE_URL}`);
export const Connect = (): void => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state: IRootState) => state.user);

  socket.onopen = () => {
    dispatch(setConnection('isConnected', true));
    console.log('Connected!');
  };

  socket.onmessage = (event: MessageEvent) => {
    const res = JSON.parse(event.data);
    switch (res.method) {
      case WSMethods.roomKey:
        dispatch(setRoom('roomKey', res.roomKey));
        dispatch(setConnection('url', `${res.roomKey}`));
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
      default:
        console.error(`Неизвестный ивент`);
    }
  };
  socket.onclose = () => {
    console.log('Наши полномочия, так сказать, всё!');
  };
  socket.onerror = () => {
    console.log('Что-то пошло не так!');
  };
};
