import {SetMetadata} from '@nestjs/common';

export const METADATA_KEY = 'permissions';

export type Action = 'create' | 'read' | 'update' | 'delete';
export type Target = 'users';
export type Permission = `${Action}:${Target}`;

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(METADATA_KEY, permissions);
