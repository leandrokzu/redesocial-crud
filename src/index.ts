﻿import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const dbUri = process.env.DB_URI as string;
mongoose
  .connect(dbUri)
  .then(() => {
    console.log('Database started');
    const app = express();

    app.use(express.json());
    app.use(routes);
    app.get('/', (_req, res) => {
      return res.json('tudo certo');
    });

    app.listen(process.env.PORT, () => {
      console.log('Server started');
    });
  })
  .catch((err) => {
    console.log(err);
  });
