import BsmOauth from './lib/bsmOauth';
import BsmOauthError from './lib/error';
import { default as BsmOauthErrorType } from './lib/types/errorType';
import { default as BsmOauthUserRole } from './lib/types/userRole';
import { StudentResource } from './lib/types/student';
import { TeacherResource } from './lib/types/teacher';

export default BsmOauth;
export {
    BsmOauth,
    BsmOauthError,
    BsmOauthErrorType,
    BsmOauthUserRole,
    StudentResource,
    TeacherResource
}