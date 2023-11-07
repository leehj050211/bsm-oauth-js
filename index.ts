import BsmOauth from './lib/bsmOauth.js';
import BsmOauthError from './lib/error.js';
import BsmOauthErrorType from './lib/types/errorType.js';
import BsmUserRole from './lib/types/userRole.js';
import { BsmStudentResource } from './lib/types/student.js';
import { BsmTeacherResource } from './lib/types/teacher.js';
import { RawBsmOAuthResource } from './lib/types/rawOAuthType.js';

export default BsmOauth;
export {
  BsmOauth,
  BsmOauthError,
  BsmOauthErrorType,
  BsmUserRole,
  BsmStudentResource,
  BsmTeacherResource,
  RawBsmOAuthResource
};
