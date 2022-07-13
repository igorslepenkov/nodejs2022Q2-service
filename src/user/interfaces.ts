interface IUser {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface IUserOutput {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export { IUser, IUserOutput };
