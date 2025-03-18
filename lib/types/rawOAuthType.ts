import UserRole from './userRole.js';

export interface RawBsmOAuthToken {
  readonly token: string;
}

export interface RawBsmOAuthResource {
  readonly id: number;
  readonly nickname: string;
  readonly isGraduate: boolean;
  readonly enrolledAt: number;
  readonly cardinal: number;
  readonly grade: number;
  readonly classNo: number;
  readonly studentNo: number;
  readonly name: string;
  readonly email: string;
  readonly role: UserRole;
  readonly profileUrl?: string;
}
