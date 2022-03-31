import { ConversationDto } from "../../../types/message/conversation.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageDto } from "../../../types/message/message.dto";

interface MessageState {
  conversations: ConversationDto[] | null;
  openedConversation: ConversationDto | null;
  loading: boolean;
  error: any;
}

const initialState: MessageState = {
  conversations: null,
  openedConversation: null,
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    fetchedInitialize(state) {
      state.loading = true;
    },
    initializeSuccess(state, action: PayloadAction<ConversationDto[]>) {
      state.loading = false;
      state.conversations = action.payload;
    },
    initializeFailed(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    fetchedCreateConversation(state, action: PayloadAction<ConversationDto>) {
      state.loading = true;
    },
    createConversationSuccess(state, action: PayloadAction<ConversationDto[]>) {
      state.loading = false;
      state.conversations = action.payload;
    },
    fetchedJoinConversation(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    joinConversationSuccess(state, action: PayloadAction<ConversationDto>) {
      state.loading = false;
      state.openedConversation = action.payload;
    },
    fetchedLeaveConversation(state, action: PayloadAction<number>) {
      state.loading = true;
    },
    leaveConversationSuccess(state) {
      state.loading = false;
      state.openedConversation = null;
    },
    fetchedSendMessage(state, action: PayloadAction<MessageDto>) {
      state.loading = true;
    },
    sendMessageSuccess(state, action: PayloadAction<MessageDto>) {
      state.loading = false;
      // @ts-ignore
      state.openedConversation!.messages = [...state.openedConversation.messages, action.payload.message,];
    },
  },
});

export const messageReducer = messageSlice.reducer;

export const {
  fetchedInitialize,
  initializeFailed,
  initializeSuccess,
  createConversationSuccess,
  fetchedCreateConversation,
  fetchedJoinConversation,
  fetchedLeaveConversation,
  joinConversationSuccess,
  leaveConversationSuccess,
  fetchedSendMessage,
  sendMessageSuccess,
} = messageSlice.actions;
