import UserRole from './userRole.js';

export default interface BsmOauthCommonResource {
  /**
   * @deprecated 유저 식별자가 code에서 id로 변경되었습니다
   */
  readonly userCode: number;
  
  readonly id: number;
  readonly role: UserRole;
  readonly nickname: string;
  readonly email: string;
  readonly profileUrl?: string;
}
