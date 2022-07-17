import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { WebhookValidator } from "./WebhookValidator";
import { TwitterService } from "./TwitterService";

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
  console.log("Info: /new-push endpoint hit");
  const githubSignature = req.header("X-Hub-Signature-256");
  if (githubSignature == undefined) {
    return res
      .status(401)
      .send("Failed: Could not find the header 'X-Hub-Signature-256'");
  }

  if (!WebhookValidator.SecretValid(req.body, githubSignature!)) {
    return res.status(401).send("Failed: Could not validate request");
  }

  const t = new TwitterService();
  t.SendTweet(req.body);
  return res.sendStatus(200);
});
