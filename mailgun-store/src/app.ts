let response;
import AWS from "aws-sdk";
const region = "us-east-1";

AWS.config.update({ region });

const dynamodb: AWS.DynamoDB = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region
});

const snsTextPublisher = new AWS.SNS({ apiVersion: "2010-03-31" });

const saveData = async (data: any) => {
  const item = {
    TableName: "mailgun-log",
    Item: {
      MessageID: {
        S: `${data.id}${Math.random()}`
      },
      msgID: {
        S: data.message.headers["message-id"]
      },
      recipient: {
        S: data.recipient
      },
      event: {
        S: data.event
      }
    }
  };
  console.log("item", item);
  return await dynamodb.putItem(item).promise();
};

const publishMessage = async (message: any) => {
  try {
    const params = {
      Message: "MESSAGE_TEXT" /* required */,
      TopicArn: "TOPIC_ARN"
    };
    const data = await snsTextPublisher.publish(params).promise();
    console.log(
      `Message ${params.Message} send sent to the topic ${params.TopicArn}`
    );
    console.log("MessageID is " + data.MessageId);
  } catch (err) {
    console.error(err, err.stack);
  }
};

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {EventList} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Promise<Object>} object - API Gateway Lambda Proxy Output Format
 *
 */
export const lambdaHandler = async (
  event: any,
  context: any
): Promise<Object> => {
  const response = {
    statusCode: 200,
    body: "True"
  };

  console.log("event", event);
  console.log("context", context);

  try {
    const body =
      typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    console.log("body", body);

    const eventData = body["event-data"];
    console.log("eventData", eventData);

    await saveData(eventData);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }

  return response;
};
