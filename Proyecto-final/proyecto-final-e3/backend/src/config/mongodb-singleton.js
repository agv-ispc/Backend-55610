import mongoose from 'mongoose';
import config from './env.db.js';

class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.MONGO_URL);
      console.log('Connected to MongoDB.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }
}

export default MongoSingleton;