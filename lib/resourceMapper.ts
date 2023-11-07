import BsmOauthError from './error.js';
import ErrorType from './types/errorType.js';
import { RawBsmOAuthResource } from './types/rawOAuthType.js';
import { BsmStudent, BsmStudentResource } from './types/student.js';
import { BsmTeacher, BsmTeacherResource } from './types/teacher.js';
import UserRole from './types/userRole.js';

const toResource = (resource: RawBsmOAuthResource): BsmStudentResource | BsmTeacherResource => {
  const { code: userCode, role, nickname, email, profileUrl } = resource;
  const commonResource = { userCode, nickname, email, profileUrl };

  if (role === UserRole.STUDENT) {
    return { ...commonResource, role, student: toStudent(resource) };
  }
  if (role === UserRole.TEACHER) {
    return { ...commonResource, role, teacher: toTeacher(resource) };
  }
  throw new BsmOauthError(ErrorType.INVALID_USER_ROLE);
};

const toStudent = (resource: RawBsmOAuthResource): BsmStudent => {
  const { name, isGraduate, enrolledAt, cardinal, grade, classNo, studentNo } = resource;

  return {
    name,
    enrolledAt,
    grade,
    classNo,
    studentNo,
    isGraduate,
    cardinal
  };
};

const toTeacher = (resource: RawBsmOAuthResource): BsmTeacher => {
  const { name } = resource;

  return { name };
};

export const ResourceMapper = {
  toResource
};
