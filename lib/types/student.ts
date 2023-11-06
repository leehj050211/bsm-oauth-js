import CommonResource from './commonResource.js';
import UserRole from './userRole.js';

export interface BsmStudent {
  readonly name: string;
  readonly enrolledAt: number;
  readonly grade: number;
  readonly classNo: number;
  readonly studentNo: number;
  readonly isGraduate: boolean;
  readonly cardinal: number;
}

export interface BsmStudentResource extends CommonResource {
  readonly role: UserRole.STUDENT;
  readonly student: BsmStudent;
}
