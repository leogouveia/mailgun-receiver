import AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import storeData from "./storeDataDB";
import publishMessage from "./publishSnsMessage";

const region = "us-east-1";
const table = process.env.MAILGUN_TABLE || "mailgunTable";
const snsPublisher = new AWS.SNS({ apiVersion: "2010-03-31" });

AWS.config.update({ region });
const db: AWS.DynamoDB = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region
});

/**
 *
 * @param event
 */
export async function handler(event: APIGatewayProxyEvent): Promise<Object> {
  try {
    const body =
      event.body && typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body;
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
