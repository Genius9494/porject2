import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = process.env.MONGO_URI as string;
const options: MongoClientOptions = {
  connectTimeoutMS: Infinity, // connect
  socketTimeoutMS: Infinity,  // 45 Response To The Connection 
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
  // Development
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Actual Contact
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;