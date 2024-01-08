import { IsEmail, IsString } from 'class-validator';

export class NotifiyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  text: string;
}
