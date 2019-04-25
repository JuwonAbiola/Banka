CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR (50) NOT NULL,
    lastname VARCHAR (50) NOT NULL,
    othername VARCHAR (50) NOT NULL,
    email VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    registered_at VARCHAR (55) NOT NULL,
    is_Admin BOOLEAN NOT NULL
);
CREATE TABLE accounts
(
    id SERIAL PRIMARY KEY,
    accountNumber INT UNIQUE NOT NULL,
    createdOn VARCHAR (50) NOT NULL,
    owner_Id INT NOT NULL,
    FOREIGN KEY (owner_Id) REFERENCES users(id),   
    type VARCHAR (50) UNIQUE NOT NULL,
    status VARCHAR (50) NOT NULL,
    balance INT NOT NULL
);

CREATE TABLE transactions
(
    id SERIAL PRIMARY KEY,
    createdOn VARCHAR (50) NOT NULL,
    type VARCHAR (50) NOT NULL,
    accountNumber INT NOT NULL,
    FOREIGN KEY (accountNumber) REFERENCES accounts(accountNumber),   
    cashier VARCHAR (50) UNIQUE NOT NULL,
    amount VARCHAR (50) NOT NULL,
    oldBalance VARCHAR (55) NOT NULL,
    newBalance VARCHAR (55) NOT NULL
);
