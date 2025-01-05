/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

//application routes

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();

  // const a = 22;

  // res.send(a);
};

app.get('/', test);

// error handling
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
