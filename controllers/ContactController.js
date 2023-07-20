const nodemailer = require("nodemailer");
var XMLHttpRequest = require("xhr2");

module.exports.addContactData = async (req, res) => {
  const { name, email, phone, subject } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@flyweis.technology",
        pass: "ygkojtgemllsgpgs",
      },
    });

    var mail = {
      from: "info@flyweis.technology",
      to: "info@flyweis.technology",
      subject: `${email} want to contact you`,
      text: `Name: ${name}, Phone: ${phone}, Subject: ${subject}`,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let xhr = new XMLHttpRequest();
    xhr.open("post", "/addContactData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
    };

    return res.status(200).json({ msg: "Message send successfully" });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
