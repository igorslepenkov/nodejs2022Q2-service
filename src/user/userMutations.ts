import { IUser, IUserOutput } from './interfaces';

const userToOutput = (user: IUser): IUserOutput => {
  if (user) {
    const { id, login, version, createdAt, updatedAt } = user;

    return {
      id,
      login,
      version,
      createdAt,
      updatedAt,
    };
  } else {
    return null;
  }
};

export { userToOutput };
