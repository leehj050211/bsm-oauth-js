import UserRole from "./userRole.js";

export default interface CommonResource {
  readonly userCode: number;
  readonly role: UserRole
  readonly nickname: string;
  readonly email: string;
}