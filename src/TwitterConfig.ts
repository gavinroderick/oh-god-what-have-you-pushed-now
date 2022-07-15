export class TwitterConfig {
  private _appKey: string;
  private _appSecret: string;
  private _accessToken: string;
  private _accessSecret: string;

  constructor() {
    this._appKey = process.env.APP_KEY!;
    this._appSecret = process.env.APP_SECRET!;
    this._accessToken = process.env.ACCESS_TOKEN!;
    this._accessSecret = process.env.ACCESS_SECRET!;
  }

  public get appKey(): string {
    return this._appKey;
  }
  public get appSecret(): string {
    return this._appSecret;
  }
  public get accessToken(): string {
    return this._accessToken;
  }
  public get accessSecret(): string {
    return this._accessSecret;
  }
}
