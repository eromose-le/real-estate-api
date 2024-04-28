import { red } from "console-log-colors";

export const logError = (_name: string, _error: number | string | any) =>
  red.bgRed.bold(
    `[${_name?.toUpperCase()}] - ${red.bgWhiteBright.bold(_error)}`
  );
