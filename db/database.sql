CREATE DATABASE CARMA;

CREATE TABLE creditcard (
   id VARCHAR(255) PRIMARY KEY,
   card_number VARCHAR(255) NOT NULL,
   cvv VARCHAR(255) NOT NULL,
   card_holder_name VARCHAR(255) NOT NULL,
   expiration_month VARCHAR(2) NOT NULL,
   expiration_year VARCHAR(4) NOT NULL,
   createdDate TIMESTAMP DEFAULT NOW()
   );
