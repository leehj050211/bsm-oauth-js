export enum BsmOauthErrorType {
    AUTH_CODE_NOT_FOUND = 'AUTH_CODE_NOT_FOUND',
    TOKEN_NOT_FOUND = 'TOKEN_NOT_FOUND',
    INVALID_CLIENT = 'INVALID_CLIENT'
    
}

export class BsmOauthError extends Error {
    constructor(
        type: BsmOauthErrorType,
        message?: string
    ) {
        super(message)
        this.name = 'BsmOauthError';
        this.type = type;
    };

    type: BsmOauthErrorType;
}