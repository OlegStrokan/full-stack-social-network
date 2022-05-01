import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserConversationDto } from '../../types/message/conversation.dto';
import { ConversationList } from './ConversationList';
import { Conversation } from './Conversation';
// @ts-ignore
import styles from './MessagePage.module.css'
import { io, Socket } from 'socket.io-client';
import { Grid } from '@mui/material';

interface MessagesPageInterface {
  isAuth: boolean;
  userId: number | null,
}

export const MessagesPage: React.FC<MessagesPageInterface> = ({ isAuth, userId }) => {

  const [conversations, setConversations] = React.useState<UserConversationDto[]>([]);

  let socket: Socket | null = null;
  if (isAuth) {
    socket = io('http://localhost:8001', {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      }
    })

  }

  const navigate = useNavigate();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!isAuth) {
      return navigate('/login');
    }

    socket?.on('conversations', (data) => {
      setConversations([...conversations, ...data]);
    });


    return () => {
      setConversations([]);
      socket?.disconnect();
      socket?.off();
    }
  }, [isAuth])


  return (
    <Grid>
      {conversations.length === 0 ?
        <Grid>You don't have any conversations</Grid>
        :
        <Grid className={styles.root}>
          <ConversationList conversations={conversations}/>
          <Conversation userId={userId} socket={socket}/>
        </Grid>}
    </Grid>
  );
};
