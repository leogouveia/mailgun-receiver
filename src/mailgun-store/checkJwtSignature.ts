import crypto from "crypto";

type paramsTypes = {
  signingKey: string;
  timestamp: string;
  token: string;
  signature: string;
};
export default function checkJwtSignature({
  signingKey,
  timestamp,
  token,
  signature
}: paramsTypes): boolean {
  const encodedToken = crypto
    .createHmac("sha256", signingKey)
    .update(timestamp.concat(token))
    .digest("hex");
  return encodedToken === signature;
}
