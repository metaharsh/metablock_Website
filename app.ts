import express, { Request, Response } from "express";
import { join } from "path";
import morgan from "morgan";
import { contactRouter } from "./routes/contactRouter";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  morgan.token("headers", (req: Request) => JSON.stringify(req.headers));
  morgan.token("body", (req: Request) => JSON.stringify(req.body));
  morgan.token("query", (req: Request) => JSON.stringify(req.query));
  morgan.token("params", (req: Request) => JSON.stringify(req.params));
  const simplifiedLoggingFormat =
    ":url Body: :body Query: :query Params: :params";
  app.use(morgan(simplifiedLoggingFormat));
  app.use(morgan("dev"));
}

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "index.html"));
});

//  Other Routes Uses
app.use("/api/v1/contact", contactRouter);
// End Of the file
app.get("*", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "Error.html"));
});

export default app;
