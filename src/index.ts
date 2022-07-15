import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { WebhookValidator } from "./WebhookValidator";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

app.get("/ping", (req: Request, res: Response) => {
  res.sendStatus(204);
});

app.post("/new-push", (req: Request, res: Response) => {
  const githubSignature = req.header("X-Hub-Signature-256");
  if (githubSignature == undefined) {
    res.status(401).send("Could not find the header 'X-Hub-Signature-256'");
  }

  if (!WebhookValidator.SecretValid(req.body, githubSignature!)) {
    res.status(401).send("Could not validate request");
  }

  res.sendStatus(200);
});
