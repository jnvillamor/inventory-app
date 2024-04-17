import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user';
import { compare } from 'bcrypt';
import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = nextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectToDb();
          const existingUser = await User.findOne({ email: email });

          if (!existingUser) return null;

          const passwordMatched = await compare(password, existingUser.password);
          
          if (!passwordMatched) return null;

          return existingUser;
        } catch (error) {
          console.log(error);
        }
      }
    })
  ]
});

export { handler as GET, handler as POST };
