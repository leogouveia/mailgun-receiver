import { handler } from "../lambda";

const APIGatewayRequest = {
  headers: {},
  multiValueHeaders: {},
  httpMethod: "GET",
  isBase64Encoded: false,
  path: "",
  pathParameters: {},
  queryStringParameters: {},
  multiValueQueryStringParameters: {},
  stageVariables: {},
  requestContext: {
    accountId: "",
    apiId: "",
    httpMethod: "",
    path: "",
    stage: "",
    requestId: "",
    requestTimeEpoch: 123,
    resourceId: "",
    resourcePath: "",
    identity: {
      accessKey: null,
      accountId: null,
      apiKey: null,
      apiKeyId: null,
      caller: null,
      cognitoAuthenticationProvider: null,
      cognitoAuthenticationType: null,
      userArn: null,
      cognitoIdentityId: null,
      cognitoIdentityPoolId: null,
      principalOrgId: null,
      sourceIp: "",
      user: null,
      userAgent: null
    }
  },
  resource: "",
  body:
    '{"signature":{"timestamp":"1581429678","token":"196b112ca5e9290ac812bf70614adeb2f2dc4d406a986211a7","signature":"5fb6015280d348a632bee68e80f06db265db8d4ac04399bcf19fec5c8791417c"},"event-data":{"tags":["my_tag_1","my_tag_2"],"timestamp":1521472262.908181,"storage":{"url":"https://se.api.mailgun.net/v3/domains/mg.leogouveia.com/messages/message_key","key":"message_key"},"envelope":{"sending-ip":"209.61.154.250","sender":"bob@mg.leogouveia.com","transport":"smtp","targets":"alice@example.com"},"recipient-domain":"example.com","id":"CPgfbmQMTCKtHW6uIWtuVe","campaigns":[],"user-variables":{"my_var_1":"Mailgun Variable #1","my-var-2":"awesome"},"flags":{"is-routed":false,"is-authenticated":true,"is-system-test":false,"is-test-mode":false},"log-level":"info","message":{"headers":{"to":"Alice ","message-id":"20130503182626.18666.16540@mg.leogouveia.com","from":"Bob ","subject":"Testdelivered webhook"},"attachments":[],"size":111},"recipient":"alice@example.com","event":"delivered","delivery-status":{"tls":true,"mx-host":"smtp-in.example.com","attempt-no":1,"description":"","session-seconds":0.4331989288330078,"utf8":true,"code":250,"message":"OK","certificate-verified":true}}}'
};

describe("Receive mailgun webhook event", () => {
  describe("handler", () => {
    it("should throw error if body is not a MailgunWebookResponse", async () => {
      try {
        const response = await handler({
          ...APIGatewayRequest,
          body: ""
        });
      } catch (error) {
        expect(error).toMatch("error");
      }
    });
    it("should return status code 406 if JWT signature is not valid", () => {
      const event = {
        ...APIGatewayRequest,
        body:
          '{"signature":{"timestamp":"1581429678","token":"196b112ca5e9290ac812bf70614adeb2f2dc4d406a986211a7","signature":"5fb601528348a632bee68e80f06db265db8d4ac04399bcf19fec5c8791417c"},"event-data":{"tags":["my_tag_1","my_tag_2"],"timestamp":1521472262.908181,"storage":{"url":"https://se.api.mailgun.net/v3/domains/mg.leogouveia.com/messages/message_key","key":"message_key"},"envelope":{"sending-ip":"209.61.154.250","sender":"bob@mg.leogouveia.com","transport":"smtp","targets":"alice@example.com"},"recipient-domain":"example.com","id":"CPgfbmQMTCKtHW6uIWtuVe","campaigns":[],"user-variables":{"my_var_1":"Mailgun Variable #1","my-var-2":"awesome"},"flags":{"is-routed":false,"is-authenticated":true,"is-system-test":false,"is-test-mode":false},"log-level":"info","message":{"headers":{"to":"Alice ","message-id":"20130503182626.18666.16540@mg.leogouveia.com","from":"Bob ","subject":"Testdelivered webhook"},"attachments":[],"size":111},"recipient":"alice@example.com","event":"delivered","delivery-status":{"tls":true,"mx-host":"smtp-in.example.com","attempt-no":1,"description":"","session-seconds":0.4331989288330078,"utf8":true,"code":250,"message":"OK","certificate-verified":true}}}'
      };
      expect(handler(event)).resolves.toStrictEqual({ statusCode: 406 });
    });
    it("should return status code 200 if event body is ok", () => {
      expect(handler(APIGatewayRequest)).resolves.toStrictEqual({
        statusCode: 200
      });
    });
  });
});
