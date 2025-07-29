import mysql from 'mysql2'
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host:     process.env.MYSQL_HOST,
    user:     process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();


export async function getUsersList() {
const [rows] = await pool.query('SELECT * FROM users');
return rows;
}

export async function createUser(name, password) {
    const [result] = await pool.query(
        `INSERT INTO users (username, user_password) VALUES (?, ?)`, [name, password]);
        return result.insertId;
}
export async function getUser(user_id){
    const [result] = await pool.query(
        `SELECT * FROM  users WHERE user_id = ?`, [user_id]);
        return result[0];
}

// const newUser = await createUser('JM', 'pogiakohaha');

// const user = await getUser(2);

// console.log(newUser);
// console.log(user);