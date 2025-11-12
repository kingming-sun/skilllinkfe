/**
 * Stack Auth 配置
 */
import { StackClientApp } from "@stackframe/stack";

export const stackApp = new StackClientApp({
  projectId: import.meta.env.VITE_STACK_PROJECT_ID || "29a175ee-764e-4b93-890d-7f0fd0ad8835",
  publishableClientKey: import.meta.env.VITE_STACK_PUBLISHABLE_CLIENT_KEY || "pck_aak8g0ev84f1jqmzbfjn1wrjmmg2se27y0hdydxv3x8s0",
});

