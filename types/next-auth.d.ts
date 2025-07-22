import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import { AdapterUser } from "next-auth/adapters"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    username?: string
  }
  
  interface User extends AdapterUser {
    username?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string
  }
}