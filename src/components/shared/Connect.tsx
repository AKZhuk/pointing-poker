import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConnection } from '../../redux/reducers/connection/connectionActions';
import { addRoom, setRoom } from '../../redux/reducers/room/roomActions';
import { GameRole, IRootState } from '../../types';

const BASE_URL = 'localhost:5000';

const Connect = (): void => {
  const dispatch = useDispatch();
  const { scrumMaster, player, observer } = GameRole;
  const room = useSelector((state: IRootState) => state.room);
  const { url, isConnected, isGotoLobby } = useSelector((state: IRootState) => state.connection);
  const { user } = useSelector((state: IRootState) => state.user);
  const { role } = user;
  const socket = useMemo(() => new WebSocket(`ws://${BASE_URL}`), []);

  socket.onopen = () => {
    dispatch(setConnection('isConnected', true));
    console.log('Connected!');
  };

  socket.onmessage = (event: MessageEvent) => {
    const res = JSON.parse(event.data);
    switch (res.method) {
      case 'roomKey':
        dispatch(setRoom('roomKey', res.roomKey));
        dispatch(setConnection('url', `${res.roomKey}`));
        break;
      case 'createRoom':
        dispatch(addRoom(res.data));
        break;
      case 'addMember':
        dispatch(setRoom('members', res.data));
        break;
      case 'addIssue':
        dispatch(setRoom('issues', res.data));
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

  useEffect(() => {
    const isCreateRoom = isConnected && room !== null && room.roomKey === '' && role === scrumMaster && isGotoLobby;
    const isConnectToLobby = isConnected && (role === player || role === observer) && url.length > 10 && isGotoLobby;
    if (isCreateRoom) {
      const message = { method: 'createRoom', data: room };
      socket.send(JSON.stringify(message));
      dispatch(setConnection('isGotoLobby', false));
    }
    if (isConnectToLobby) {
      const message = {
        method: 'addMember',
        roomKey: url,
        data: user,
      };
      socket.send(JSON.stringify(message));
      dispatch(setConnection('isGotoLobby', false));
    }
  }, [dispatch, isGotoLobby, isConnected, observer, player, role, room, scrumMaster, socket, url, url.length, user]);
};

export default Connect;
