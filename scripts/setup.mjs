import { MongoClient } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const setup = async () => {
  // Skip database setup during build process
  const isBuildOrTest = process.env.NODE_ENV === 'test' || 
                        process.env.NEXT_PHASE === 'phase-production-build';
  
  if (isBuildOrTest) {
    console.log('Skipping database setup during build/test process');
    return;
  }
  
  // Check if MongoDB URI is available
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Skipping database setup.');
    return;
  }

  let client;

  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();

    const hasData = await client
      .db('test')
      .collection('users')
      .countDocuments();

    if (hasData) {
      console.log('Database already exists with data');
      client.close();
      return;
    }

    const records = [...Array(10)].map(() => {
      const [fName, lName] = faker.name.findName().split(' ');
      const username = faker.internet.userName(fName, lName);
      const email = faker.internet.email(fName, lName);
      const image = faker.image.people(640, 480, true);

      return {
        name: `${fName} ${lName}`,
        username,
        email,
        image,
        followers: 0,
        emailVerified: null
      };
    });

    const insert = await client
      .db('test')
      .collection('users')
      .insertMany(records);

    if (insert.acknowledged) {
      console.log('Successfully inserted records');
    }
  } catch (error) {
    console.warn('Database error:', error.message);
    return 'Database is not ready yet';
  } finally {
    if (client) {
      await client.close();
    }
  }
};

try {
  setup();
} catch (error) {
  console.warn('Error during setup:', error.message);
  console.warn('Database is not ready yet. Skipping seeding...');
}

export { setup };
