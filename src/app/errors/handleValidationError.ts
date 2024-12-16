import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map((val) => {
    if (
      val instanceof mongoose.Error.ValidatorError ||
      val instanceof mongoose.Error.CastError
    ) {
      return {
        path: val.path,
        message: val.message,
      };
    }
    return {
      path: 'unknown',
      message: 'Unknown error type',
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
