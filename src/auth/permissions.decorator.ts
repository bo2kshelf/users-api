import {SetMetadata} from '@nestjs/common';

export const PERMISSIONS_METADATA_KEY = 'permissions';

export type CRUDAction = 'create' | 'read' | 'update' | 'delete';

export type MyselfPermission = `read:myself` | `update:myself`;
export type UsersPermission = `${CRUDAction}:users`;

export type Permission = MyselfPermission | UsersPermission;

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
