"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvKeys = void 0;
const constants_1 = require("../constants");
exports.EnvKeys = {
    NODE_ENV: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : "local",
    JWT_SECRET: (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "secret",
    isLocal() {
        return this.NODE_ENV === constants_1.ENVIRONMENTS.local;
    },
    isDevelopment() {
        return this.NODE_ENV === constants_1.ENVIRONMENTS.development;
    },
    isStaging() {
        return this.NODE_ENV === constants_1.ENVIRONMENTS.staging;
    },
    isProduction() {
        return this.NODE_ENV === constants_1.ENVIRONMENTS.production;
    },
};
