const nodemailer = require("nodemailer");
var XMLHttpRequest = require("xhr2");

module.exports.sendPaymentData = async (req, res) => {
  const {
    name,
    amount,
    description,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;
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
      subject: `${name} paid you amount`,
      text: `${name} paid you this ${amount}, ${description}`,
    };

    transporter.sendMail(mail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    let xhr = new XMLHttpRequest();
    xhr.open("post", "/sendPaymentData");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function () {
      console.log(xhr.responseText);
    };

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto
      .createHmac("sha256", "Wok5mJv2F0pa5HKLeXZfUr9r")
      .update(body.toString())
      .digest("hex");
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);

    if (expectedSignature === razorpay_signature) {
      const response = { signatureIsValid: "true" };
      return res
        .status(200)
        .json({ msg: "Message send successfully", response });
    } else {
      const response = { signatureIsValid: "false" };
      return res
        .status(200)
        .json({ msg: "Message send successfully", response });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
};
