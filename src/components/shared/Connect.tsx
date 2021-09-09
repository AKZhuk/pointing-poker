import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConnection } from '../../redux/reducers/connection/connectionActions';
import { setRoom } from '../../redux/reducers/room/roomActions';
import { IRootState } from '../../types';

const BASE_URL = 'ws://localhost:5000';

const Connect = (): void => {
  const [isConnected, seIsConnected] = useState(false);
  const dispatch = useDispatch();
  const room = useSelector((state: IRootState) => state.room);
  const socket = useMemo(() => new WebSocket(BASE_URL), []);

  socket.onopen = () => {
    seIsConnected(true);
    dispatch(setConnection('isLogin', true));
    console.log('Connected!');
  };

  socket.onmessage = (event: MessageEvent) => {
    const res = JSON.parse(event.data);
    if (res.method === 'roomKey') {
      dispatch(setRoom('roomKey', res.roomKey));
    }
    console.log(`Что-то пришло!${res}`);
  };
  socket.onclose = () => {
    console.log('Наши полномочия, так сказать, всё!');
  };
  socket.onerror = () => {
    console.log('Что-то пошло не так!');
  };

  useEffect(() => {
    const message = { method: 'createRoom', room };
    if (isConnected && room !== null && room.roomKey === '') {
      socket.send(JSON.stringify(message));
    }
  }, [isConnected, room, socket]);
};

export default Connect;
