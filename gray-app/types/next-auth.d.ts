import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's id. */
      id: string | null;
      /** The user's name. */
      username: string | null;
      //** The user's password */
      password: string | null;
      /** The user's email address. */
      email: string | null;
      /** The user's image URL. */
      image: string | null;
      /** The user's role. */
      role: string | null;
      /** The user's country. */
      country: string | null;
      /** The user's logo. */
      logo: string;
      /** The user's description. */
      description: string | null;
    } & DefaultSession['user'];
  }
  interface User {
    /** The user's id. */
    id: string | null;
    /** The user's name. */
    username: string | null;
    //** The user's password */
    password: string | null;
    /** The user's email address. */
    email: string | null;
    /** The user's image URL. */
    image: string | null;
    /** The user's role. */
    role: string | null;
    /** The user's country. */
    country: string | null;
    /** The user's logo. */
    logo: string | null;
    /** The user's description. */
    description: string | null;
  }
}
