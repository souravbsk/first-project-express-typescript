/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  const a = 22;

  res.send(a);
});

// error handling
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
