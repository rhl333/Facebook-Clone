require("dotenv").config();
const nodeMailer = require("nodemailer");
const { google } = require("googleapis");
let OAuth2 = google.auth.OAuth2;
const OauthLInk = "https://developers.google.com/oauthplayground";

let clientId = process.env.clientId;
let clientSecret = process.env.clientSecret;
let refreshToken = process.env.refreshToken;
let email = process.env.email;

let oauthClient = new OAuth2(clientId, clientSecret);
oauthClient.setCredentials({
  refresh_token: refreshToken,
});

let sendVerificationMail = (reciepent, name, url) => {
  let accessToken = oauthClient.getAccessToken();
  let transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: email,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken,
    },
  });

  const mailOptions = {
    from: email,
    to: reciepent,
    subject: "Activate Your Facebook Account",
    html: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Document</title></head><body><style>div.first{display:flex;align-items:center;gap:0 1rem;color:#3b5998;font-weight:600;margin-bottom:1rem;font-family:Roboto}div.second{padding:1rem;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141023;font-size:17px}a.confirm{padding:.6rem 1rem;background-color:#3b5998;color:#fff;text-transform:capitalize;text-decoration:none;margin-top:.6rem;font-weight:600;display:inline-block}</style><div class="first"><img src="https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png" style="width:40px;height:40px" alt=""><span style="font-size:25px; font-weight:600;">Action required : Activate Your Account</span></div><div class="second"><p>Hello ${name}</p><p>You recently created an account on Facebook. To complete your registration please confirm your account.</p><a href=${url} class="confirm" target="_blank" rel="noreferrer">Confirm Your Account</a></div></body></html>`,
  };
  transport.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    else return res;
  });
};

module.exports = { sendVerificationMail };
