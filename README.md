# mailgun-receiver

## Running building and deploying

To run this project you neet to have the folowing tools installed on your machine:

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 12](https://nodejs.org/en/), including the NPM package management tool.
- AWS CLI - [Install the AWS CLI](https://aws.amazon.com/cli/)

To build and deploy your application for the first time, run the following in your shell:

```bash
npm run build
sam deploy --guided
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
