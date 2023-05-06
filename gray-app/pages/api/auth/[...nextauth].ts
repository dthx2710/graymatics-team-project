import NextAuth from 'next-auth';
import { compare } from 'bcrypt';
import CredentialsProvider from 'next-auth/providers/credentials';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';
import type { NextAuthOptions } from 'next-auth';

const jwtProvider = CredentialsProvider({
  id: 'jwt',
  name: 'jwt',
  credentials: {},
  async authorize(_credentials, _req) {
    const { id } = _credentials as { id: string };
    if (!id) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: { id: id }
    });
    return user;
  }
  // NEED to find a better way to do this in the future
  // Improvement: if we can decode the JWT and get the user id instead of passing it as a parameter
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'username' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { username: username }
        });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          // check password
          const passwordMatch = await compare(password, user.password!);
          if (passwordMatch) {
            return user;
          } else {
            return null;
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    jwtProvider
  ],
  pages: {
    // signIn: '/login',
    // verifyRequest: '/verify',
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  theme: {
    logo: '/static/images/graymatics.webp',
    brandColor: '#8C7CF0',
    colorScheme: 'light'
  },
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub as string;
      session.user.username = token.username as string;
      session.user.role = token.role as string;
      session.user.country = token.country as string;
      session.user.description = token.description as string;
      session.user.profilepic = token.profilepic as string;
      session.user.logo = token.logo as string;
      session.user.email = token.email as string;
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.country = user.country;
        token.description = user.description;
        token.profilepic = user.image;
        token.logo= user.logo;
        token.user = user;
        token.email = user.email;
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);
