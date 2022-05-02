import React from 'react';
import { UserConversationDto } from '../../types/message/conversation.dto';
import { Link } from 'react-router-dom';
// @ts-ignore
import styles from './MessagePage.module.css';
import { Grid, Typography } from '@mui/material';


interface IConversations {
  conversations: any[];
}

export const ConversationList: React.FC<IConversations> = ({ conversations }) => {
  return (
    <Grid className={styles.conversationList}>
      {conversations?.map((conversation: UserConversationDto) => {
        return <Grid>
          <Link to={`/messages/${conversation.id}`}>
            <Typography>{conversation.id}</Typography>
          </Link>
        </Grid>
      })}
    </Grid>
  );
};

;
