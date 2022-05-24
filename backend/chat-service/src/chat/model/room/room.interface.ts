import { UserCreationAttr } from '../../../../../social-network/src/user/models/user.model';

export interface RoomI {
  id?: number;
  name?: string;
  description?: string;
  users?: UserCreationAttr[];
  created_at?: Date;
  updated_at?: Date;
}
