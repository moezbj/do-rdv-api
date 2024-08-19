/* 
import getServer from '../../src/config/apollo'
import { port, databaseUri } from '../../src/config/vars'
import prisma from '../../src/config/prisma'
import mongoose from 'mongoose';

import serverless from "serverless-http";
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
 */
import getServer from '../../src/config/apollo'
import { databaseUri } from '../../src/config/vars'
import prisma from '../../src/config/prisma'
import mongoose from 'mongoose'
import serverless from 'serverless-http'

let isConnected = false

const connectDB = async () => {
  try {
    if (databaseUri && !isConnected) {
      await mongoose.connect(databaseUri)
      console.log('🎉 Connected to MongoDB successfully')
      isConnected = true // Prevent reconnection on subsequent function invocations
    }
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

prisma.$connect() // Prisma connection initialization

export const handler = async (event, context) => {
  await connectDB() // Ensure the database connection is established

  const app = await getServer() // Get your Express app instance
  const graphqlHandler = serverless(app) // Convert the Express app to a Lambda handler

  return graphqlHandler(event, context) // Handle the request with serverless-http
}
