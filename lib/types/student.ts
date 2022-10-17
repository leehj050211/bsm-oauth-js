import CommonResource from "./commonResource";
import UserRole from "./userRole";

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