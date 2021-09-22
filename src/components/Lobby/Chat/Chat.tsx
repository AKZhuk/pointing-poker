import { IconButton, InputAdornment, Paper, TextField } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import Title from '../../shared/Title';
import { IChatMessage, IRootState } from '../../../types';
import './Chat.scss';

const Chat = (): JSX.Element => {
  const {
    room: { roomKey, chatMessages },
    user,
  } = useSelector((state: IRootState) => state);
  const [msg, setMsg] = useState('');
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (msg) {
      SendWSMessage('addChatMessage', roomKey, { user, message: msg, date: Date.now() });
      setMsg('');
    }
  };
  const chatField = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatField.current) {
      chatField.current.scroll({
        top: chatField.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [chatMessages]);
  return (
    <Paper className="chat">
      <Title text="Chat" variant="h5" align="center" />
      <div className="chat__field" ref={chatField}>
        {chatMessages.map((el: IChatMessage) => (
          <ChatMessage key={el.date} user={el.user} message={el.message} date={el.date} />
        ))}
      </div>
      <form className="chat__inputBox" onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          margin="none"
          size="small"
          value={msg}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={submitHandler}>
                  <Send color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </Paper>
  );
};

export default Chat;
