import { UserType } from './modelType';

export interface createUserType {
  email: UserType['email'];
  password: UserType['password'];
  userName: UserType['userName'];
}
