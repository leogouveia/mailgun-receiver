type MailgunWebhookResponse = {
  signature: {
    timestamp: string;
    token: string;
    signature: string;
  };
  "event-data": {
    tags: string[];
    timestamp: number;
    storage: {
      url: string;
      key: string;
    };
    envelope: {
      "sending-ip": string;
      sender: string;
      transport: string;
      targets: string;
    };
    "recipient-domain": string;
    id: string;
    campaigns: [];
    "user-variables": {};
    flags: {
      "is-routed": boolean;
      "is-authenticated": boolean;
      "is-system-test": boolean;
      "is-test-mode": boolean;
    };
    "log-level": string;
    message: {
      headers: {
        to: string;
        "message-id": string;
        from: string;
        subject: string;
      };
      attachments: [];
      size: number;
    };
    recipient: string;
    event: string;
    "delivery-status": {
      tls: boolean;
      "mx-host": string;
      "attempt-no": 1;
      description: string;
      "session-seconds": 0.4331989288330078;
      utf8: boolean;
      code: number;
      message: string;
      "certificate-verified": true;
    };
  };
};

export default MailgunWebhookResponse;
