//============================== Nodemailer

// import nodemailer from "nodemailer";

// const { UKR_NET_PASSWORD, UKR_NET_FROME } = process.env;

// const nodemailerConfig = {
//   host: "smtp.ukr.net",
//   port: 465,
//   secure: true,
//   auth: {
//     user: UKR_NET_FROME,
//     pass: UKR_NET_PASSWORD,
//   },
// };

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = (data) => {
//   const email = { ...data, from: UKR_NET_FROME };

//   return transport.sendMail(email);
// };

// export default sendEmail;

//============================== ElasticEmail

import ElasticEmail from "@elasticemail/elasticemail-client";

const defaultClient = ElasticEmail.ApiClient.instance;

const { ELASTICEMAIL_API_KEY, ELASTICEMAIL_FROM } = process.env;

const { apikey } = defaultClient.authentications;
apikey.apiKey = ELASTICEMAIL_API_KEY;

const api = new ElasticEmail.EmailsApi();

const email = ElasticEmail.EmailMessageData.constructFromObject({
  Recipients: [new ElasticEmail.EmailRecipient("fohalo2168@sentrau.com")],
  Content: {
    Body: [
      ElasticEmail.BodyPart.constructFromObject({
        ContentType: "HTML",
        Content: "My test email content ;)",
      }),
    ],
    Subject: "Verify your email",
    From: ELASTICEMAIL_FROM,
  },
});

const callback = function (error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully.");
  }
};

api.emailsPost(email, callback);

export default sendEmail;

//==============================
