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

export interface IActionPopUp {
  type: string;
  payload?: { [key: string]: boolean };
}

export enum GameRole {
  scrumMaster = 'scrumMaster',
  player = 'player',
  observer = 'observer',
}

export interface IUser {
  firstName: string;
  lastName?: string;
  jobPostion?: string;
  urlToImage?: string;
  role: string;
}

export interface IGameSettings {
  ScrumMasterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: string;
  scoreTypeShort: string;
  timer?: string;
  cards: { value: string; name: string }[];
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

export enum Routes {
  lobby = 'lobby',
  game = 'game',
  result = 'result',
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
  isLogin: boolean;
}

export interface IIssue {
  title: string;
  priority: string;
  link: string;
}

export interface IRootState {
  connection: IConnection;
  user: { user: IUser; members: IUser[] };
  popUp: IPopUp;
  issues: { title: string; priority: string; link: string }[];
  gameSettings: IGameSettings;
}

export interface IUserState {
  user: IUser;
  members: IUser[];
}
