import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpUserDto {
  @IsOptional()
  @IsString({
    message: 'Inform a valid username',
  })
  name: string;

  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'Inform a valid email address',
    },
  )
  email: string;

  @IsOptional()
  status: boolean;
}
