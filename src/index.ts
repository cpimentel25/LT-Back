import express from 'express';
import connectDB from './config/database';
import * as dotenv from 'dotenv';
import configExpress from './config/express';
import routes from './routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

connectDB();
configExpress(app);
routes(app);

app.listen(PORT, () => {
  console.log(`~ Server is runing ~ on port ${PORT}`);
});
