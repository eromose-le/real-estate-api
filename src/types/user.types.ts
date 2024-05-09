// interface 

export interface User {
  id: string;
  name: string;
  avatar: string | null;
}

export type UpdateUserDto = {
  password?: string;
  avatar?: string;
  // Add other fields from your user model here
};

export type UpdateUserParams = {
  id: string;
  payload: {
    inputs?: Partial<UpdateUserDto>;
    updatedPassword?: string;
    avatar?: string | null;
  };
};

export type UpdateUserResponse = {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
  createdAt: Date;
};