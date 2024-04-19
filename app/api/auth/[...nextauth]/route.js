import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user';
import { compare } from 'bcrypt';
import nextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
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
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      })
      
      // update the session
      session.user.id = sessionUser._id.toString();
      session.firstName = sessionUser.firstName;
      session.lastName = sessionUser.lastName;
      
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider == 'credentials') {
        return true;
      }
      
      try {
        await connectToDb();

        // check if user exists
        const userExist = await User.findOne({ email: profile.email });

        // create new user if user does not exists
        if(!userExist) {
          await User.create({
            email: profile.email,
            image: profile.picture,
            lastName: profile.family_name,
            firstName: profile.given_name,
          })
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
