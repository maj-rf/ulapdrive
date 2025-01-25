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

export type Folder = {
  name: string;
  id: string;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type File = {
  folderId: string;
  id: string;
  name: string;
  mimeType: string;
  size: number;
  ownerId: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};
