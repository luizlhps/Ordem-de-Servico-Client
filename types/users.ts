export interface RootUser {
  total: number;
  page: number;
  limit: number;
  user: IUser[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  deleted: boolean;
  group: Group;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
  phone: string;
  id: number | string;
}

export interface Group {
  _id: string;
  name: string;
  permissions: Permissions;
  createdAt?: string;
  updatedAt?: string;
}

export interface Permissions {
  create: string[];
  deleted: string[];
  update: string[];
  view: string[];
}

export interface IMyInfoUser {
  _id: string;
  name: string;
  email: string;
  group: Group;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  phone: string;
  id: number;
}
