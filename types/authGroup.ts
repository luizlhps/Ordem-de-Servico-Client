export interface RootAuthGroup {
  total: number;
  page: number;
  limit: number;
  authGroup: AuthGroup[];
}

export interface AuthGroup {
  _id: string;
  name: string;
  permissions: IPermissions;
}

export interface IPermissions {
  create: string[];
  update: string[];
  deleted: string[];
  view: string[];
}
