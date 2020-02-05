interface ISnsLib {
  publish: Function;
}

const publishMessage = async (snsTextPublisher: any, message: string) => {
  try {
    const topic = process.env.MAILGUN_TOPIC;
    const params = {
      Message: message /* required */,
      TopicArn: topic
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
export default publishMessage;
