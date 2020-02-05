import { DynamoDB } from "aws-sdk";
import { PutItemInput } from "aws-sdk/clients/dynamodb";

export default function store(db: DynamoDB, table: string, data: any) {
  const dbData: PutItemInput = {
    TableName: table,
    Item: {
      id: {
        S: data.message.headers["message-id"]
      },
      eventId: {
        S: data.id
      },
      recipient: {
        S: data.recipient
      },
      event: {
        S: data.event
      },
      timestamp: {
        N: String(data.timestamp)
      },
      body: {
        S: JSON.stringify(data)
      }
    }
  };
  return db.putItem(dbData).promise();
}
