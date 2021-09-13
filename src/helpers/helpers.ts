import { IRoom, IUser } from '../types';

// тут будут вспомогательные функции
export function getRoomKeyFromURL(url = window.location.search): string {
  const arr = url.split('?');
  const customURL = arr[arr.length - 1];
  const urlParams = new URLSearchParams(`?${customURL}`);
  const roomKey = urlParams.has('room') ? `${urlParams.get('room')}` : '';
  return roomKey;
}

export function creatLinkFromKey(id: string): string {
  const URL = `${window.location.origin}/?room=${id}`;
  return URL;
}

export function idGenerator(): string {
  const id = Date.now() * Math.ceil(Math.random() * 1000000 * Math.random());
  const result = String(id);
  return result.slice(result.length - 7, result.length - 1);
}

export function delay(seconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

export function saveLoginInfo(user: IUser, room: IRoom): void {
  if (room.roomKey.length > 10) {
    const loginInfo = {
      user: user.id,
      room: room.roomKey,
    };
    sessionStorage.removeItem('LoginInfo');
    sessionStorage.setItem('LoginInfo', JSON.stringify(loginInfo));
  }
}
