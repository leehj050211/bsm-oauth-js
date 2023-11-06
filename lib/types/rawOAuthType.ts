import UserRole from './userRole.js';

export interface RawBsmOAuthToken {
  readonly token: string;
}

export interface RawBsmOAuthResource {
  readonly code: number;
  readonly nickname: string;
  readonly enrolledAt: number;
  readonly grade: number;
  readonly classNo: number;
  readonly studentNo: number;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  readonly profileUrl: string;
}
