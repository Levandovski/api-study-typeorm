import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error";

let serverIsRunning: boolean = false;

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.get("/ping", (request: Request, response: Response) => {
    if (serverIsRunning)
      response.status(200).json({ status: "OK", version: "0.0.1" });
  });

  app.use(routes);
  app.use(errorMiddleware);

  return app.listen(process.env.PORT, () => {
    console.log("Server Running", process.env.PORT);
    serverIsRunning = true;
  });
});
