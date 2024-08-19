
import getServer from './config/apollo'
import { port, databaseUri } from './config/vars'
import prisma from './config/prisma'
import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    if (databaseUri) {
      await mongoose.connect(databaseUri);
      console.log("🎉 connected to database successfully");
    }
  } catch (error) {
    console.error(error);
  }
};
connectDB();
prisma.$connect();

getServer().then((httpServer) => {
  httpServer.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`)
  })
})
