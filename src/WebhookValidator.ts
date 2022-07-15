import { createHmac, timingSafeEqual } from "crypto";

export class WebhookValidator {
  static SecretValid(webhookBody: string, webhookSignature: string): boolean {
    const comparison = this.generateComparisonSignature(webhookBody);
    return timingSafeEqual(
      Buffer.from(comparison),
      Buffer.from(webhookSignature)
    );
  }

  private static generateComparisonSignature(body: string) {
    const secret = process.env.WEBHOOK_SECRET;
    if (secret == undefined || secret == null || secret === "")
      console.error("EnvVar WEBHOOK_SECRET was undefined, null  or empty");

    const hmac = createHmac("sha256", secret!)
      .update(JSON.stringify(body))
      .digest("hex");

    return `sha256=${hmac}`;
  }
}
