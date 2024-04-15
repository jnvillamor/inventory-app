import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDb = async () => {
  /** Only keys defined in the schema are use during query filter. */
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI),
      {
        dbName: 'inventory-app',
        useNewUrlParser: true,
        useUnifiedTopology: true
      };

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
    isConnected = false;
  }
};
