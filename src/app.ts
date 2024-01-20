import express from 'express';
import mongoose, { Connection } from 'mongoose';
import { ConnectOptions } from 'mongoose';
import { dbConnection } from '../src/databases/index';
import router from '../src/routes/index';
import { NODE_ENV, PORT } from './config/index';

const app = express();
const { url, options } = dbConnection;

const db: Connection = mongoose.createConnection(url, options as ConnectOptions);

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
  app.use(router);



  const port = PORT || 5000;
  const env = NODE_ENV || 'development';
  app.use(env);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
