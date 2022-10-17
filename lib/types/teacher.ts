import CommonResource from "./commonResource";
import UserRole from "./userRole";

export interface Teacher {
    readonly name: string;
}

export interface TeacherResource extends CommonResource {
    readonly role: UserRole.TEACHER;
    readonly teacher: Teacher;
}
