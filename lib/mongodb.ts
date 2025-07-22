import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // your mongodb connection string
const options = {};

let client;
let clientPromise: Promise<any>;

declare global {
  var _mongoClientPromise: Promise<any>;
}

// Check if we're in a build/test environment or if MONGODB_URI is not available
const isBuildOrTest = process.env.NODE_ENV === 'test' || 
                      process.env.NEXT_PHASE === 'phase-production-build' || 
                      !process.env.MONGODB_URI;

if (isBuildOrTest) {
  console.log('Using mock MongoDB client for build/test environment');
  // For build/test, provide a mock client that won't try to connect
  const mockClient = {
    db: () => ({
      collection: () => ({
        findOne: async () => ({}),
        find: () => ({
          toArray: async () => []
        }),
        updateOne: async () => ({ modifiedCount: 1 }),
        aggregate: () => ({
          toArray: async () => []
        }),
        countDocuments: async () => 0,
        insertOne: async () => ({ insertedId: '123' }),
        deleteOne: async () => ({ deletedCount: 1 })
      })
    }),
    close: async () => {}
  };
  clientPromise = Promise.resolve(mockClient);
} else if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
