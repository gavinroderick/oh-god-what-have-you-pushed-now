import { TweetV2PostTweetResult, TwitterApi } from "twitter-api-v2";
import { TwitterConfig } from "./TwitterConfig";

export interface ITwitterService {
  SendTweet(message: string): TweetV2PostTweetResult | string;
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

  public SendTweet(message: string): TweetV2PostTweetResult | string {
    this._client.v2
      .tweet(message)
      .then((resp) => {
        console.log(resp);
        return resp;
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    return "Something went wrong (T_T)";
  }
}
