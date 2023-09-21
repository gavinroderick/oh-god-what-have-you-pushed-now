import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { WebhookValidator } from "./WebhookValidator";
import { TwitterService } from "./TwitterService";
import { WebhookEvent } from "@octokit/webhooks-types";

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

  if (WebhookValidator.InvalidRequest(req, res) == null) {
    const t = new TwitterService(req, req.header("X-GitHub-Event")!);
    t.SendTweet(req.body);
    return res.sendStatus(200);
  }
});
