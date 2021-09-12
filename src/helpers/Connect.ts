import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { WSMethods } from './constants';
import { addRoom, setRoom } from '../redux/reducers/room/roomActions';
import { setConnection } from '../redux/reducers/connection/connectionActions';
import { defaultRoomState } from '../redux/reducers/room/roomReducer';

const BASE_URL = 'localhost:5000';

export const socket = new WebSocket(`ws://${BASE_URL}`);
export const Connect = (): void => {
  const dispatch = useDispatch();
  /* const { scrumMaster, player, observer } = GameRole;
  const room = useSelector((state: IRootState) => state.room);
  const {
    connection: { url, isConnected, isGotoLobby },
    user: { role },
    user,
  } = useSelector((state: IRootState) => state); */ /* 
  dispatch(setConnection('socket', socket)) */
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
        // переадресация на first page
        break;
      case WSMethods.changeRoute:
        dispatch(setRoom('route', res.data));
        // переадресация на науказанный роут
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

  /* useEffect(() => {
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
  }, [dispatch, isGotoLobby, isConnected, observer, player, role, room, scrumMaster, socket, url, url.length, user]); */
};

/*
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Lobby from './Lobby/Lobby';
import './App.scss';
import FirstPage from './FirstPage/FirstPage';
import { Button } from '@material-ui/core';
import { GameRole, IRootState } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setMembers } from '../redux/reducers/user/userActions';
import { addIssues } from '../redux/reducers/issues/issuesActions';

const App = (): JSX.Element => {
  const socket = new WebSocket('ws://localhost:5000')
  const settings = useSelector((state: IRootState) => state.gameSettings);
  const dispatch = useDispatch()
  let key: string;
  useEffect(()=> {
    connection()
  })
  function connection () {
    socket.onopen = () => {
      console.log('Cоединение установлено')
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      switch (message.method){
        case 'roomKey':{
          key = message.roomKey
          console.log(key)
        }
        case 'addMember':{
          console.log(message.data)
          dispatch(setMembers(message.data))
        }
          break;
        case 'addIssue':{
          console.log(message.data)
          dispatch(addIssues(message.data))
        }
          break;
      }

    }
    socket.onerror = (err) => {
      console.log(err)
    }
  }

  const testUser = {
    firstName: 'Test',
    lastName: 'Test',
    jobPostion: 'Test',
    urlToImage: '',
    role: GameRole.scrumMaster,
}

  function createRoom() {
    const message = {
      method: 'createRoom',
      data: {
        roomKey: '',
        scrumMaster: testUser,
        members: [],
        issues: [],
        gameSettings: {
          ScrumMasterAsPlayer: false,
          changingCardInRoundEnd: false,
          isTimerNeeded: false,
          scoreType: '',
          scoreTypeShort: '',
          timer: '02:00',
          cards: { sequence:'fibonacci',
           count: 3
          }
        }
      }
    }
    socket.send(JSON.stringify(message))
  }

  function addMember() {
    const message = {
      method: 'addMember',
      roomKey: key,
      data: {
            firstName: 'Aliaksei',
            lastName: 'Vasin',
            jobPostion: 'developer',
            urlToImage: '',
            role: GameRole.player,
      }
    }
    socket.send(JSON.stringify(message))

  }


  function addIssue() {
    const message = {
      method: 'addIssue',
      roomKey: key,
      data: {
          title: 'test',
          priority: 'high',
          link: 'testLink'
      }
    }
    socket.send(JSON.stringify(message))
  }
  function changeSettings() {
    console.log(settings)
    const message = {
      method: 'changeSettings',
      roomKey: key,
      data: settings
    }
    socket.send(JSON.stringify(message))
  }
  return (
    <div className="app">
      <Header />
      <main className="main">
        <FirstPage />
        <Button variant='contained' onClick={createRoom}>create room</Button>
        <Button variant='contained' onClick={addMember}>add member</Button>
        <Button variant='contained' onClick={addIssue}>add issue</Button>
        <Button variant='contained' onClick={changeSettings}>change Settings</Button>
        <Lobby />
      </main>
      <Footer />
    </div>
  );
};
export default App;
 */

/* export interface IRoom {
    roomKey?: string;
    scrumMaster: IUser;
    members: IUser[];
    issues: IIssue[];
    gameSettings: IGameSettings;
  }

  export interface IMesssage {
    method: keyof typeof WSMethods;
    roomKey: string;
  }

  export interface IErrorMessage {
    method: 'error';
    data: string;
  }

  export interface ICreateRoomMessage {
    method: keyof typeof WSMethods;
    data: IRoom;
  }

  export interface IAddMemberToRoomMessage extends IMesssage {
    data: IUser;
  }
  export interface IResponseMembers extends IMesssage {
    data: IUser[];
  }
  export interface IAddIssueToRoomMessage extends IMesssage {
    data: IIssue;
  }
  export interface IResponseIssues extends IMesssage {
    data: IIssue[];
  }
  export interface IChangeSettingsMessage extends IMesssage {
    data: IGameSettings;
  } */
