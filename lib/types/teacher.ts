import CommonResource from "./commonResource.js";
import UserRole from "./userRole.js";

export interface BsmTeacher {
  readonly name: string;
}

export interface BsmTeacherResource extends CommonResource {
  readonly role: UserRole.TEACHER;
  readonly teacher: BsmTeacher;
}
