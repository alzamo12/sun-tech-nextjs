import { MongoClient } from "mongodb";

let client;
let clientPromise;

// if (!process.env.MONGO_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

const uri =`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.g8eto.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

if (process.env.NODE_ENV === "development") {
  // In development, use global variable to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
