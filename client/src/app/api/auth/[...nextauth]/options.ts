import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { DefaultSession } from "next-auth";
import api from 'services/api';

// Definição de um tipo para o usuário autenticado
interface CustomUser extends User {
  id: string;
}

// Extende o tipo Session para incluir `id`
declare module "next-auth" {
  interface Session {
    user?: CustomUser & DefaultSession["user"];
  }
}

// Estende o tipo JWT para garantir que ele contenha `user`
declare module "next-auth/jwt" {
  interface JWT {
    user?: CustomUser;
  }
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'ID', type: 'text' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'email' }
      },

      async authorize(credentials) {
        const response = await api.post('/sessions', {
          id: credentials?.id,
          username: credentials?.username,
          email: credentials?.email,
          password: credentials?.password
        });

        const { user } = response.data.data;

        if (user) {
          return {
            id: user.id, 
            name: user.name,
            email: user.email,
            image: user.image
          } as CustomUser;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as CustomUser; 
      }
      return token;
    },

    async session({ session, token }) {
      if (token.user) {
        session.user = token.user; 
      }
      return session;
    }
  }
};
