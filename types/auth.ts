export interface IResponseLogin {
  accessToken: string;
  refreshToken: string;
  roles: Roles;
  permissions: Permissions;
}

export interface Permissions {
  create: string[];
  deleted: string[];
  update: string[];
  view: string[];
}

export interface Roles {
  _id: string;
  name: string;
}
