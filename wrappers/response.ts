import { Response } from 'express';

export const failedResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  data: any = null
): Response => {
  return res.status(statusCode).json({
    message,
    status: false,
    data,
  });
};

export const successResponse = (
  res: Response,
  message: string,
  data: any = null,
  statusCode: number = 200
): Response => {
  return res.status(statusCode).json({
    message,
    data,
    status: true,
  });
};
