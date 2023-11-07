import UserRole from './userRole.js';

export default interface BsmOauthCommonResource {
  readonly userCode: number;
  readonly role: UserRole;
  readonly nickname: string;
  readonly email: string;
  readonly profileUrl?: string;
}
