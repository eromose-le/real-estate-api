"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
const console_log_colors_1 = require("console-log-colors");
const logError = (_name, _error) => console_log_colors_1.red.bgRed.bold(`[${_name === null || _name === void 0 ? void 0 : _name.toUpperCase()}] - ${console_log_colors_1.red.bgWhiteBright.bold(_error)}`);
exports.logError = logError;
