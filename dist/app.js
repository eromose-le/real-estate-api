"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const console_log_colors_1 = require("console-log-colors");
const constants_1 = require("./src/constants");
const error_1 = require("./src/middleware/error");
const EnvKeys_1 = require("./src/common/EnvKeys");
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
const test_route_js_1 = __importDefault(require("./src/routes/test.route.js"));
const user_route_js_1 = __importDefault(require("./src/routes/user.route.js"));
// import postRoute from "./src/routes/post.route.js";
// import chatRoute from "./src/routes/chat.route.js";
// import messageRoute from "./src/routes/message.route.js";
const app = (0, express_1.default)();
const apiPath = "/api/v1";
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
if (EnvKeys_1.EnvKeys.isLocal()) {
    app.use((0, morgan_1.default)("dev"));
}
app.use(`${apiPath}/auth`, auth_route_1.default);
app.use(`${apiPath}/test`, test_route_js_1.default);
app.use(`${apiPath}/users`, user_route_js_1.default);
// app.use(`${apiPath}/posts`, postRoute);
// app.use(`${apiPath}/chats`, chatRoute);
// app.use(`${apiPath}/messages`, messageRoute);
app.use(error_1.errorHandler);
const PORT = process.env.PORT || constants_1.DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(console_log_colors_1.green.bgWhiteBright(`Server is running on  - ${console_log_colors_1.white.bgGreenBright.bold(PORT)}`));
});
