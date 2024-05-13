"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwner = void 0;
const constants_1 = require("../constants");
/**
 *
 * @param res response
 * @param next next middleware
 * @param userId userId from request
 * @param tokenUserId userId from JWT
 * @returns Error JSON payload
 */
const verifyOwner = (res, next, userId, tokenUserId) => {
    if (userId !== tokenUserId)
        return res.status(403).json({
            error: constants_1.ERROR_MESSAGES.NOT_AUTHORIZED,
            success: false,
            statusCode: constants_1.HTTP_STATUS_CODE[403].code,
        });
    next();
};
exports.verifyOwner = verifyOwner;
