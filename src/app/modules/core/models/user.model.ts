export interface UserLoginData {
  username: string;
  password: string;
}

export interface GetUserResponse {
  id: number;
  email: string;
  password: string;
  username: string;
}

export class User {
  constructor(
    public email: string,
    public username: string,
  ) {}
}
