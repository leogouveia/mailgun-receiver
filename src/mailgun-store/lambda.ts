import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import storeData from "./storeDataDB";
import publishMessage from "./publishSnsMessage";
import MailgunWebookResponse from "./types/MailgunWebhookResponse";
import LambdaResponse from "./types/LambdaResponse";
import checkJwtSignature from "./checkJwtSignature";

const mailgunSigningKey = "39b9cfab6ace5d96f6898e25adf8c3e4-074fa10c-eb1f0a65";
const region = "us-east-1";
const table = process.env.MAILGUN_TABLE || "mailgunTable";
const snsPublisher = new AWS.SNS({ apiVersion: "2010-03-31" });

AWS.config.update({ region });
const db = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region
});

/**
 *  Get data from API Gateway
 * @param event
 * @returns <Response>
 */
export async function handler(
  event: APIGatewayProxyEvent
): Promise<LambdaResponse> {
  try {
    if (!event.body) {
      throw new Error("No body content.");
    }
    const body: MailgunWebookResponse = JSON.parse(event.body);
    if (
      !checkJwtSignature({
        signingKey: mailgunSigningKey,
        timestamp: body.signature.timestamp,
        token: body.signature.token,
        signature: body.signature.signature
      })
    ) {
      return {
        statusCode: 406
      };
    }
    const data = body["event-data"];
    await storeData(db, table, data);
    await publishMessage(
      snsPublisher,
      `The event "${data.event}" happened in message  ${data.message.headers["message-id"]}`
    );
    return {
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500
    };
  }
}
