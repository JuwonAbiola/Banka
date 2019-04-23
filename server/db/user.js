import db from '../config';


const registerUser = async(data) => {
    const {
        accountNumber,
        createdOn,
        status,
        id,
        accountType,
        openingBalance,
    } = data;
    console.log(data);
    const newItem = await db.query(
        `INSERT INTO accounts (
     account_number, created_on, status, 
     owner_id, account_type, account_balance
   ) 
   VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [accountNumber, createdOn, status, id, accountType, openingBalance],
    );
    return newItem.rows[0];
};

export {
    registerUser
};