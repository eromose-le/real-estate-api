"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwner = void 0;
const constants_1 = require("../constants");
const verifyOwner = (res, next, userId, tokenUserId) => {
    if (userId !== tokenUserId)
        return res.status(403).json({
            error: constants_1.ERROR_MESSAGES.NOT_AUTHORIZED,
            success: false,
            statusCode: constants_1.HTTP_STATUS_CODE[403],
        });
    next();
};
exports.verifyOwner = verifyOwner;
