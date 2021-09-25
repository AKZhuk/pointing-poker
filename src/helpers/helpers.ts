import XLSX from 'xlsx';
import { IUser, IRoom } from '../types';

export function getRoomKeyFromURL(url = window.location.search): string {
  const arr = url.split('?');
  const customURL = arr[arr.length - 1];
  const urlParams = new URLSearchParams(`?${customURL}`);
  const roomKey = urlParams.has('room') ? `${urlParams.get('room')}` : '';
  return roomKey;
}

export const validateURL = (url?: string): boolean => getRoomKeyFromURL(url) !== '';

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

export function getTimeFromDate(date: Date): string {
  const timeArr = date.toLocaleTimeString().split(':');
  timeArr.pop();
  return timeArr.join(':');
}
export const parseDataFromExcel = (bufferArray: ArrayBuffer): unknown[] => {
  const wb = XLSX.read(bufferArray, { type: 'buffer' });
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  return XLSX.utils.sheet_to_json(ws);
};

export const exportToExcel = (data: unknown[], headers?: string[]): void => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data, { header: headers });
  XLSX.utils.book_append_sheet(wb, ws, 'result');
  XLSX.writeFile(wb, 'gameResult.xlsx');
};

export function getUserFromRoom(id: string, room: IRoom): IUser | null {
  if (room.scrumMaster.id === id) return room.scrumMaster;
  const index = room.members.findIndex(member => member.id === id);
  if (index >= 0) return room.members[index];
  return null;
}
