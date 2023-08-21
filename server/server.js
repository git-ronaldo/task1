import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const salt= 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: 'signup',
    connectionLimit: 10
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, salt);

    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES(?, ?, ?)";
    const values = [name, email, hashedPassword];

    db.query(sql, values, (err, result) => {
        if (err) {
    
            return res.json({ error: "Error inserting data into the Server" });
        }
        return res.json({ status: "Success" });
    });
});

app.listen(8081, () => {
    console.log("Running on port 8081");
});
