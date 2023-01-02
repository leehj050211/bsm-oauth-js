import CommonResource from "./commonResource.js";
import UserRole from "./userRole.js";

export interface Student {
  readonly name: string;
  readonly enrolledAt: number;
  readonly grade: number;
  readonly classNo: number;
  readonly studentNo: number;
}

export interface StudentResource extends CommonResource {
  readonly role: UserRole.STUDENT;
  readonly student: Student;
}