import { RoomI } from '../room/room.interface';

export interface JoinedRoomI {
  id?: number;
  socketId: string;
  user: UserCreationAttr;
  room: RoomI;
}
