# BSM OAuth JS
[BSM Auth](https://github.com/BSSM-BSM/BSM-Auth-Backend-V1)의 OAuth기능을 JS에서 사용하기 쉽게 만들어주는 라이브러리입니다.

## 설치
```bash
$ npm install bsm-oauth
```

## 사용하기

### TypeScript
```typescript
import BsmOauth, { BsmOauthError, BsmOauthErrorType, BsmOauthUserRole, StudentResource, TeacherResource } from "bsm-oauth";

// BSM OAuth 객체 초기화
const bsmOauth: BsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

try {
    // 인증코드로 토큰 발급
    const token: string = await bsmOauth.getToken(authCode);

    // 토큰으로 유저 정보 가져오기
    const resource: (StudentResource | TeacherResource) = await bsmOauth.getResource(token);

    // 가져온 유저 정보 확인
    console.log(resource.userCode);
} catch (error) {
    if (error instanceof BsmOauthError) {
        switch (error.type) {
            case BsmOauthErrorType.INVALID_CLIENT: {
                // 클라이언트 정보가 잘못되었을 때
                break;
            }
            case BsmOauthErrorType.AUTH_CODE_NOT_FOUND: {
                // 인증코드를 찾을 수 없을 때
                break;
            }
            case BsmOauthErrorType.TOKEN_NOT_FOUND: {
                // 토큰을 찾을 수 없을 때
                break;
            }
        }
    }
}
```
### JavaScript
```typescript
const { BsmOauth, BsmOauthError, BsmOauthErrorType, BsmOauthUserRole, StudentResource, TeacherResource } = require('bsm-oauth');

const bsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET);

(async () => {
    try {
        // 인증코드로 토큰 발급
        const token = await bsmOauth.getToken(authCode);

        // 토큰으로 유저 정보 가져오기
        const resource = await bsmOauth.getResource(token);

        // 가져온 유저 정보 확인
        console.log(resource.userCode);
    } catch (error) {
        if (error instanceof BsmOauthError) {
            switch (error.type) {
                case BsmOauthErrorType.INVALID_CLIENT: {
                    // 클라이언트 정보가 잘못되었을 때
                    break;
                }
                case BsmOauthErrorType.AUTH_CODE_NOT_FOUND: {
                    // 인증코드를 찾을 수 없을 때
                    break;
                }
                case BsmOauthErrorType.TOKEN_NOT_FOUND: {
                    // 토큰을 찾을 수 없을 때
                    break;
                }
            }
        }
    }
})();
```
### 학생, 선생님계정 구분하기
role 속성으로 구분할 수 있습니다.
```javascript
// TypeScript에서는 role로 타입을 추론해야 학생 및 선생님 정보에 접근 가능합니다.
switch (resource.role) {
    case BsmOauthUserRole.STUDENT: {
        // 학생 이름 확인
        console.log(resource.student.name);
        break;
    }
    case BsmOauthUserRole.TEACHER: {
        // 선생님 이름 확인
        console.log(resource.teacher.name);
        break;
    }
}
```
