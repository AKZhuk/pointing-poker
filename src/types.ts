import { ChangeEvent } from 'react';

export interface IAction<T> {
  type: string;
  payload: { [key: string]: T };
}

export interface IIssueAction {
  type: string;
  payload?: IIssue;
}

export interface IActionPopUp {
  type: string;
  payload?: { [key: string]: boolean };
}

export enum GameRole {
  scrumMaster = 'scrum master',
  player = 'player',
  observer = 'observer',
}

export interface IState {
  user: { user: IUser; members: IUser[] };
  popUp: IPopUp;

  issues: { title: string; priority: string; link: string }[];
  gameSettings: IGameSettings;
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

export interface IpopUpProps {
  content: JSX.Element;
  buttonName: string;
}

export interface IPopUp {
  isOpen: boolean;
}

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
}

export interface IIssue {
  title: string;
  priority: 'low' | 'high' | 'normal';
  link: string;
}

export interface IRootState {
  user: IUserState;
  issues: IIssue[];
  connection: IConnection;
}

export interface IUserState {
  user: IUser;
  members: IUser[];
}
