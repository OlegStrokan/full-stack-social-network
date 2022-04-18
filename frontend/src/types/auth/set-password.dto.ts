import { VerifyCodeDto } from './verify-code.dto';

export interface SetPasswordDto extends VerifyCodeDto{
  password: string;
}
