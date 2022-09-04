import { createHmac, timingSafeEqual } from "crypto";
import { Request, Response } from "express";

export class WebhookValidator {
  static InvalidRequest(req: Request, res: Response): Response | null {
    const githubSignature = req.header("X-Hub-Signature-256");
    if (githubSignature == undefined)
      return res
        .status(401)
        .send("Failed: Could not find the header 'X-Hub-Signature-256'");

    if (!this.SecretValid(req.body, githubSignature!))
      return res.status(401).send("Failed: Could not validate request");

    if (this.IncorrectHeader(req))
      return res.status(401).send("Failed: Webhook not of correct event type");

    return null;
  }

  private static SecretValid(
    webhookBody: string,
    webhookSignature: string
  ): boolean {
    const comparison = this.generateComparisonSignature(webhookBody);
    const equal = timingSafeEqual(
      Buffer.from(comparison),
      Buffer.from(webhookSignature)
    );
    if (!equal) console.log("Failed: Signatures didn't match");
    return equal;
  }

  private static generateComparisonSignature(body: string) {
    const secret = process.env.WEBHOOK_SECRET;
    if (secret == undefined || secret == null || secret === "")
      console.log("Failed: WEBHOOK_SECRET was undefined, null  or empty");

    const hmac = createHmac("sha256", secret!)
      .update(JSON.stringify(body))
      .digest("hex");

    return `sha256=${hmac}`;
  }

  private static IncorrectHeader(req: Request): boolean {
    const acceptableHeaders = ["push"];
    const header = req.header("X-GitHub-Event");

    if (header == undefined) return true;
    if (!acceptableHeaders.includes(header)) return true;

    return false;
  }
}
