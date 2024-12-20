/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log(token);

    // Check if token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not AUTHORIZED');
    }
    // Check if token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        //err
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'you are Not AUTHORIZED',
          );
        }

        const role = (decoded as JwtPayload).role;
        if (requiredRole && !requiredRole.includes(role)) {
          throw new AppError(
            StatusCodes.FORBIDDEN,
            'you are not authorized to access this resource',
          );
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
