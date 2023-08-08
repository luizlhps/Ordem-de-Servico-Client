export interface RootUser {
  _id: string;
  name: string;
  email: string;
  group: Group;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  permissions: Permissions;
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permissions {
  create: string[];
  deleted: string[];
  update: string[];
  view: string[];
}
