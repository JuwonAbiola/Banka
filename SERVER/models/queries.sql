CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR (50) NOT NULL,
    lastname VARCHAR (50) NOT NULL,
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
    created_on VARCHAR (250) NOT NULL,  
    type VARCHAR (250)  NOT NULL,
    account_number VARCHAR (250) NOT NULL,
    cashier VARCHAR (250) NOT NULL, 
    amount VARCHAR (250)  NOT NULL,
    old_balance VARCHAR (250) NOT NULL,
    new_balance VARCHAR (250) NOT NULL
);
