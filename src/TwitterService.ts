import { TweetV2PostTweetResult, TwitterApi } from "twitter-api-v2";
import { TwitterConfig } from "./TwitterConfig";

export interface ITwitterService {
  SendTweet(message: string): TweetV2PostTweetResult | null;
}

export class TwitterService implements ITwitterService {
  private _client: TwitterApi;

  constructor() {
    const config = new TwitterConfig();
    this._client = new TwitterApi({
      appKey: config.appKey,
      appSecret: config.appSecret,
      accessToken: config.accessToken,
      accessSecret: config.accessSecret,
    });
  }

  public SendTweet(payload: any): TweetV2PostTweetResult | null {
    var tweetText = this.buildTweet(payload);
    console.log("Sending tweet: " + tweetText);
    this._client.v2
      .tweet(tweetText)
      .then((resp) => {
        console.log("Twitter Response: " + resp);
        return resp;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    return null;
  }

  private buildTweet(payload: any): string {
    const headCommit = payload.head_commit.message;
    const repo = payload.repository.name;
    return `Heads up, Gavin just pushed "${headCommit}" to the "${repo}" repo...`;
  }
}
