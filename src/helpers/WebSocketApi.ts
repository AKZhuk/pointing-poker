import { socket } from './Connect';
import { IRoom } from '../types';
import { WSMethods } from './constants';

export function CreateRoom(data: IRoom, method = WSMethods.createRoom): void {
  socket.send(
    JSON.stringify({
      method,
      data,
    }),
  );
}

export function SendWSMessage<T>(method: keyof typeof WSMethods, roomKey: string, data: T): void {
  socket.send(
    JSON.stringify({
      method,
      roomKey,
      data,
    }),
  );
}
