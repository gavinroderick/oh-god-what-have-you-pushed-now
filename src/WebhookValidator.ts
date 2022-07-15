import { createHmac, sign, timingSafeEqual } from "crypto";

export class WebhookValidator {
  static SecretValid(webhookBody: string, webhookSignature: string): boolean {
    const secret = process.env.WEBHOOK_SECRET;

    if (secret == undefined || secret == null || secret === "")
      console.error("EnvVar WEBHOOK_SECRET was undefined, null  or empty");

    const signature = createHmac("sha256", secret!);
    signature.update(webhookBody.toString());
    signature.digest("binary");

    return timingSafeEqual(
      Buffer.from("sha256=" + signature.toString()),
      Buffer.from(webhookSignature)
    );
  }
}
