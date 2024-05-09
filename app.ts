import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { green, white } from "console-log-colors";
import { DEFAULT_PORT } from "./src/constants";
import { errorHandler } from "./src/middleware/error";
import { EnvKeys } from "./src/common/EnvKeys";

import authRoute from "./src/routes/auth.route";
import testRoute from "./src/routes/test.route.js";
import userRoute from "./src/routes/user.route.js";
// import postRoute from "./src/routes/post.route.js";
// import chatRoute from "./src/routes/chat.route.js";
// import messageRoute from "./src/routes/message.route.js";

const app: Express = express();
const apiPath = "/api/v1";

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

if (EnvKeys.isLocal()) {
  app.use(morgan("dev"));
}

app.use(`${apiPath}/auth`, authRoute);
app.use(`${apiPath}/test`, testRoute);
app.use(`${apiPath}/users`, userRoute);
// app.use(`${apiPath}/posts`, postRoute);
// app.use(`${apiPath}/chats`, chatRoute);
// app.use(`${apiPath}/messages`, messageRoute);

app.use(errorHandler);

const PORT = process.env.PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(
    green.bgWhiteBright(
      `Server is running on  - ${white.bgGreenBright.bold(PORT)}`
    )
  );
});
