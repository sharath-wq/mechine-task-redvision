import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: any;
beforeAll(async () => {
    try {
        process.env.JWT_KEY = 'montyxgreen';

        mongo = await MongoMemoryServer.create();
        const mongoUri = mongo.getUri();

        await mongoose.connect(mongoUri);
    } catch (error) {
        console.error('Error during server setup:', error);
    }
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    try {
        if (mongo) {
            await mongo.stop();
        }
        await mongoose.connection.close();
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
});
