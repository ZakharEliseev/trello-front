import { md5 } from "pure-md5";

export const hashedLink = (): string => md5(String(new Date().getTime()));
