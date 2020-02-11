interface ISnsLib {
  publish: Function;
}

const publishSnsMessage = async (snsTextPublisher: any, message: string) => {
  try {
    const topic = process.env.MAILGUN_TOPIC;
    const params = {
      Message: message /* required */,
      TopicArn: topic
    };
    const data = await snsTextPublisher.publish(params).promise();
    return data;
  } catch (err) {
    console.error(err, err.stack);
  }
};
export default publishSnsMessage;
