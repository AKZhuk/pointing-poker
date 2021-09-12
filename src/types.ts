import { ChangeEvent } from 'react';

export interface IAction<T> {
  type: string;
  payload: { [key: string]: T };
}

export interface IIssueAction {
  type: string;
  payload: IIssue;
}

export interface IActionConnection {
  type: string;
  payload: { [key: string]: boolean | string };
}

export interface IRoomAction {
  type: string;
  payload: IRoom;
}

export interface IActionPopUp {
  type: string;
  payload?: { [key: string]: boolean };
}

export enum GameRole {
  scrumMaster = 'scrumMaster',
  player = 'player',
  observer = 'observer',
}

export enum Routes {
  lobby = 'lobby',
  game = 'game',
  result = 'result',
}
export enum GameStatus {
  pending = 'pending',
  active = 'active',
  finished = 'finished',
}
export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  jobPostion?: string;
  urlToImage?: string;
  role: keyof typeof GameRole;
}

export interface IGameSettings {
  ScrumMasterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: keyof IScoreTypes;
  scoreTypeShort: string;
  flipCardsWhenAllVoted: boolean;
  addPlayerWhenGameStarted: boolean;
  timer?: string;
  cards: number;
}

export interface IPopUpProps {
  content: JSX.Element;
  name: keyof typeof PopUpNames;
}
export enum PopUpNames {
  isOpen = 'isOpen',
  ConnectToLobbyPopUp = 'ConnectToLobbyPopUp',
  CreateIssuePopUp = 'CreateIssuePopUp',
}

export type IPopUp = {
  [key in PopUpNames]: boolean;
};

export interface IUploadButtonProps {
  handleUpdateImage(imageURL: string): void;
}

export interface ISwitcherProps {
  label: string;
  name: string;
  handleChecked(e: ChangeEvent<HTMLInputElement>): void;
}

export interface IConnection {
  url: string;
  socket: null | WebSocket;
  isConnected: boolean;
  isGotoLobby: boolean;
}

export interface IIssue {
  id: string;
  title: string;
  priority: string;
  link: string;
}

export interface IRootState {
  connection: IConnection;
  user: IUser;
  popUp: IPopUp;
  issues: IIssue[];
  gameSettings: IGameSettings;
  room: IRoom;
}

export interface IRoom {
  roomKey: string;
  scrumMaster: IUser;
  members: IUser[];
  issues: IIssue[];
  gameSettings: IGameSettings;
  route: keyof typeof Routes;
}

export interface IScoreTypes {
  'power of 2': number[];
  'story point': number[];
  fibonacci: number[];
}
