import { TweetV2PostTweetResult, TwitterApi } from "twitter-api-v2";
import { TwitterConfig } from "./TwitterConfig";
import { PushEvent, WebhookEvent } from "@octokit/webhooks-types";

export interface ITwitterService {
  SendTweet(message: any): TweetV2PostTweetResult | null;
}

enum GitHubEventType {
  Push = "push",
  PullRequest = "pull-request", // TODO: lookup the correct string for this,
}

export class TwitterService implements ITwitterService {
  private _client: TwitterApi;
  private _eventType: GitHubEventType;

  constructor(body: any, eventType: string) {
    const config = new TwitterConfig();
    this._client = new TwitterApi({
      appKey: config.appKey,
      appSecret: config.appSecret,
      accessToken: config.accessToken,
      accessSecret: config.accessSecret,
    });

    this._eventType = eventType as GitHubEventType;
  }

  SendTweet(message: any): TweetV2PostTweetResult | null {
    if (this._eventType === GitHubEventType.Push) {
      this.SendPushTweet(message);
    }
    return null;
  }

  private SendPushTweet(payload: PushEvent): TweetV2PostTweetResult | null {
    var tweetText = this.buildTweet(payload);
    console.log("Info: Sending tweet: " + tweetText);
    this._client.v2
      .tweet(tweetText)
      .then((resp) => {
        console.log(
          `Info: Twitter returned code ${resp.data.id}: '${resp.data.text}'`
        );
        return resp;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    return null;
  }

  private buildTweet(event: PushEvent): string {
    const headCommit = event.head_commit?.message;
    const repo = event.repository.name;
    return `Heads up, Gavin just pushed "${headCommit}" to the "${repo}" repo...`;
  }
}
