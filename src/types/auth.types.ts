export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}
export interface LoginUserDto {
  username: string;
  password: string;
}

// export type CanRegisterResponse = {
//   id: string;
//   email: string;
//   username: string;
//   avatar: string | null;
//   createdAt: Date;
// };

export type CanRegisterResponse = {
  isCanRegister: boolean;
  isUsernameExist: boolean;
  isEmailExist: boolean;
};