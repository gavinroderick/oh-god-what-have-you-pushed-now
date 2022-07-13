export class TwitterConfig {
  private _appKey: string;
  private _appSecret: string;
  private _accessToken: string;
  private _accessSecret: string;

  constructor(
    appKey: string,
    appSecret: string,
    accessToken: string,
    accessSecret: string
  ) {
    this._appKey = appKey;
    this._appSecret = appSecret;
    this._accessToken = accessToken;
    this._accessSecret = accessSecret;
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
