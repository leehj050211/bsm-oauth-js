import CommonResource from "./commonResource.js";
import UserRole from "./userRole.js";

export interface Teacher {
  readonly name: string;
}

export interface TeacherResource extends CommonResource {
  readonly role: UserRole.TEACHER;
  readonly teacher: Teacher;
}
