const json = {
  signature: {
    timestamp: "1580671907",
    token: "5c10c0d917a933ea05f87d01aa71bb038c7ef53a8722d9fb01",
    signature:
      "9e759d52bd333007162bd51a3e50d909564257a3b61a838d29966b7cb12785e4"
  },
  "event-data": {
    tags: ["my_tag_1", "my_tag_2"],
    timestamp: 1521472262.908181,
    storage: {
      url:
        "https://se.api.mailgun.net/v3/domains/mg.leogouveia.com/messages/message_key",
      key: "message_key"
    },
    envelope: {
      "sending-ip": "209.61.154.250",
      sender: "bob@mg.leogouveia.com",
      transport: "smtp",
      targets: "alice@example.com"
    },
    "recipient-domain": "example.com",
    id: "CPgfbmQMTCKtHW6uIWtuVe",
    campaigns: [],
    "user-variables": {
      my_var_1: "Mailgun Variable #1",
      "my-var-2": "awesome"
    },
    flags: {
      "is-routed": false,
      "is-authenticated": true,
      "is-system-test": false,
      "is-test-mode": false
    },
    "log-level": "info",
    message: {
      headers: {
        to: "Alice <alice@example.com>",
        "message-id": "20130503182626.18666.16540@mg.leogouveia.com",
        from: "Bob <bob@mg.leogouveia.com>",
        subject: "Test delivered webhook"
      },
      attachments: [],
      size: 111
    },
    recipient: "alice@example.com",
    event: "delivered",
    "delivery-status": {
      tls: true,
      "mx-host": "smtp-in.example.com",
      "attempt-no": 1,
      description: "",
      "session-seconds": 0.4331989288330078,
      utf8: true,
      code: 250,
      message: "OK",
      "certificate-verified": true
    }
  }
};
console.log(
  JSON.stringify({
    json: JSON.stringify(json)
  })
);
