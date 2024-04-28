import { ENVIRONMENTS } from "../constants";

export const EnvKeys = {
  NODE_ENV: process.env.NODE_ENV ?? "local",
  JWT_SECRET: process.env.JWT_SECRET ?? "secret",

  isLocal(): boolean {
    return this.NODE_ENV === ENVIRONMENTS.local;
  },
  isDevelopment() {
    return this.NODE_ENV === ENVIRONMENTS.development;
  },
  isStaging() {
    return this.NODE_ENV === ENVIRONMENTS.staging;
  },
  isProduction() {
    return this.NODE_ENV === ENVIRONMENTS.production;
  },
};
