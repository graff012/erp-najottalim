import express from 'express';
import 'dotenv/config';
import configurateDatabase from './config/database.js';
import Routes from './routes/routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', Routes());

const initApp = async () => {
  try {
    configurateDatabase();

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.error(err.message);
  }
};

initApp();
