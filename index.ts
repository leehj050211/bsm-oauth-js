import BsmOauth from './lib/bsmOauth.js';
import BsmOauthError from './lib/error.js';
import { default as BsmOauthErrorType } from './lib/types/errorType.js';
import { default as BsmOauthUserRole } from './lib/types/userRole.js';
import { StudentResource } from './lib/types/student.js';
import { TeacherResource } from './lib/types/teacher.js';

export default BsmOauth;
export {
  BsmOauth,
  BsmOauthError,
  BsmOauthErrorType,
  BsmOauthUserRole,
  StudentResource,
  TeacherResource
}