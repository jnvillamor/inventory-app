/** This route is for registering new users using email and password
 * Passwords are hashed using bcrypt.
 */

import { connectToDb } from '@/lib/mongodb';
import User from '@/models/user';
import { hash } from 'bcrypt';

export const POST = async (request) => {
  const { email, firstName, lastName, password } = await request.json();

  try {
    await connectToDb();

    // encrypted the password
    const hashedPassword = await hash(password, 10);

    User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    });

    return new Response('User is registered', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong!', { status: 500 });
  }
};
