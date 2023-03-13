# Install the node modules by

npm i

# Start the project by

npm start

# Node version : v18.15.0

# npm version: 9.5.0

# PostGres version: 15.2

# Make sure to edit the .env file to include your own database connections variables, you may find .env copy as an example

# This NodeJs server works on PORT number found on .env file if it's not in used else it will run on 4001, it have nodemon to restart the server on any change

# Steps to create Database to be used in this project:

- You could find it in ./db/database.sql

# In the app.js you may find the route to the credits, creditRouter where it will have the controller for the saveCreditInfo

# In CreditsController the function saveCreditInfo where the data send from the ReactJS in a POST form

1. After the data received from the client side we first apply the Luhn Algorithm which already installed using npm to check if the credit card number is valid or not

## Note

Luhn Algorithm added on both sides server side and client side just to show you both usage

2. we have a Function called encryptCardData that take two parameters cardNumber & CVV to encrypt them and returned the encrypted data back before saving the data in the PostGres

3. In encryptCardData we are using CryptoJS as a third library to encrypt the data
   a. First we have created our SECRETKEY that's stored in the .env file using the below code :

   - const CryptoJS = require("crypto-js");
   - const keySize = 256 / 8;
   - const key = CryptoJS.lib.WordArray.random(keySize);
   - console.log(key.toString());

   b. After saving the SECRETKEY in the .env file you may you use it to encrypt your data using the Advanced Encryption Standard (AES) algorithm by passing the Plain Text and the SECRETKEY to return as a result the ciphertext to be saved in the Database

4. we used AES since it considered to be a very strong encryption algorithm that provides both security and performance. While other encryption algorithms may be faster or easier to implement, but they may not provide the same level of security as AES.

## TODO

1. [ ] Ensure that sensitive information (credit card number, CVV) is transmitted securely over HTTPS
2. [ ] Implement a payment processing API to handle transactions
3. [ ] Add payment gateways
4. [ ] Develop an API for tracking payments.
