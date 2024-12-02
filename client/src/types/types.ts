export type FormData = {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
};

export type PublicUser = {
  id: number;
  email: string;
  displayName: string;
  createdAt: Date;
  updatedAt: Date;
};
