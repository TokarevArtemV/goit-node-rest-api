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

const sendEmail = (data) => {
  const email = ElasticEmail.EmailMessageData.constructFromObject({
    Recipients: [new ElasticEmail.EmailRecipient(data.to)],
    Content: {
      Body: [
        ElasticEmail.BodyPart.constructFromObject({
          ContentType: "HTML",
          Content: data.html,
        }),
      ],
      Subject: data.subject,
      From: ELASTICEMAIL_FROM,
    },
  });

  const callback = function (error, data, response) {
    if (error) {
      console.error(error.message);
    } else {
      // console.log("Email sended successfully.");
    }
  };

  api.emailsPost(email, callback);
};

export default sendEmail;

//==============================
