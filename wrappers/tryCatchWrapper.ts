import { Request, Response } from "express";
import { failedResponse } from "./response";

export default function tryCatchWrapper(
  asyncFn: (req: Request, res: Response, ...args: any[]) => Promise<any>
) {
  return async function (
    req: Request,
    res: Response,
    ...args: any[]
  ): Promise<any> {
    try {
      return await asyncFn(req, res, ...args);
    } catch (error: any) {
      console.log(error.message);
      if (error.name === "MongoError") {
        switch (error.code) {
          case 11000:
            failedResponse(
              res,
              "Duplicate key error. The resource already exists."
            );
            break;
          case 11001:
            failedResponse(
              res,
              "Duplicate key constant violation. The resource already exists."
            );
            break;
          case 12500:
            failedResponse(res, "Validation error. Please provide valid data.");
            break;
          default:
            failedResponse(res, "An error occurred. Please try again later.");
            break;
        }
      } else if (error.name === "ValidationError") {
        failedResponse(res, "Validation error. Please provide valid data.");
      } else if (error.message === "jwt expired") {
        failedResponse(
          res,
          "JWT token has expired. Please log in again.",
          500,
          { jwt: false }
        );
      } else if (error.name === "PermissionError") {
        failedResponse(
          res,
          "Permission error. You do not have permission to perform this operation."
        );
      } else if (error.name === "SyntaxError") {
        failedResponse(res, "Syntax error. Please check your request syntax.");
      } else if (error.name === "NotFoundError") {
        failedResponse(res, "Resource not found.");
      } else if (error.name === "NetworkError") {
        failedResponse(res, "Network error occurred. Please try again later.");
      } else {
        failedResponse(res, "An error occurred. Please try again later.");
      }
    }
  };
}
