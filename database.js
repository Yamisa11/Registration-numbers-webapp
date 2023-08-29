import pgPromise from "pg-promise"
import dotenv from 'dotenv';

dotenv.config();
const pgp = pgPromise()
const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
};


const db = pgp(connection);
db.connect()

export default db ;


