import {ResponseCodes} from "../enums";

export const ResponseMessages = {
    [ResponseCodes.SUCCESS]: 'Success',
    [ResponseCodes.CREATED]: 'Resource Created Successfully',
    [ResponseCodes.BAD_REQUEST]: 'Bad Request',
    [ResponseCodes.UNAUTHORIZED]: 'Unauthorized',
    [ResponseCodes.NOT_FOUND]: 'Resource not found',
    [ResponseCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error',

}