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

export async function createUser(username, password) {
    const [result] = await pool.query(
        `INSERT INTO users (username, user_password) VALUES (?, ?)`, [username, password]);
        return result.insertId;
}
export async function getUserID(user_id){
    const [result] = await pool.query(
        `SELECT * FROM  users WHERE user_id = ?`, [user_id]);
        return result[0];
}
export async function getAccount(username){
    const [result] = await pool.query(
        `SELECT * FROM users WHERE username = ?`, [username]);
        return result[0];
}
export async function storeMessage(username, message){
        const [result] = await pool.query(
        `INSERT INTO messages (username, message) VALUES (?, ?)`, [username, message]);
}
export async function fetchMessage(){
        const [result] = await pool.query(
        `SELECT username, message
         FROM messages 
         WHERE created >= NOW() - INTERVAL 7 DAY
        ORDER BY created ASC`
        );
        return result;
}

