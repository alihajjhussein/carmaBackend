const pool = require("../db/db");
var CryptoJS = require("crypto-js");
var luhn = require("luhn");
const { v4: uuidv4 } = require("uuid");

class CreditsController {
  saveCreditInfo = async (req, res) => {
    // Received the data from the client side
    const { cardNumber, cvv, cardHolderName, expirationMonth, expirationYear } =
      req.body;
    try {
      // Check if the cardNumber is valid using Luhn Algorithm
      var is_valid = luhn.validate(cardNumber);
      if (is_valid) {
        // Send cardNumber & cvv to the Encrypted Function
        const { encryptedCardNumber, encryptedCVV } = encryptCardData(
          cardNumber,
          cvv
        );
        // Create ID for the credit card using uuid
        const creditID = uuidv4();

        // Save the data to PostGres
        const result = await pool.query(
          "INSERT INTO creditcard (id, card_number, cvv, card_holder_name, expiration_month, expiration_year) VALUES ($1, $2, $3, $4, $5, $6)",
          [
            creditID,
            encryptedCardNumber,
            encryptedCVV,
            cardHolderName,
            expirationMonth,
            expirationYear,
          ]
        );

        console.log("Data inserted successfully");
        res.status(200).json("Credit card data saved successfully");
      } else {
        console.log("Invalid credit card number");
        res.status(400).json("Invalid credit card number");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("Error: Could not save credit card data");
    }
  };
}
// Encryption Function
function encryptCardData(cardNumber, cvv) {
  var encryptedCardNumber = CryptoJS.AES.encrypt(
    cardNumber,
    process.env.SECRETKEY
  ).toString();
  var encryptedCVV = CryptoJS.AES.encrypt(
    cvv,
    process.env.SECRETKEY
  ).toString();

  /// The below is mentioned just for reference to Decrypt
  // var bytes = CryptoJS.AES.decrypt(encryptedCardNumber, process.env.SECRETKEY);
  // var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return { encryptedCardNumber, encryptedCVV };
}
const creditsController = new CreditsController();
module.exports = creditsController;
