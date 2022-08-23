export class CreateUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPass: string;
  createat: Date;
  update: Date;
}
