/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next/image-types/global" />
/// <reference types="next-auth/react" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.
import "next-auth";
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
  }
}