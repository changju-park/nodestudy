const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// MySQL 연결 정보 설정
const connection = mysql.createConnection({
    host: '',
    user: 'root',
    password: 'work',
    database: 'database1'
});

// MySQL 연결
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Body Parser 미들웨어 사용
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// public 디렉토리를 정적 파일 루트 디렉토리로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 테이블 생성 쿼리
// const createTableQuery = `
//     CREATE TABLE IF NOT EXISTS table1 (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         이름 VARCHAR(50),
//         나이 INT,
//         키 FLOAT,
//         몸무게 FLOAT
//     )
// `;

// 테이블 생성 및 초기 데이터 추가
// connection.query(createTableQuery, (err) => {
//     if (err) {
//         console.error('Error creating table:', err);
//     } else {
//         console.log('Table created successfully');
//     }
// });

// 이벤트 신청 폼 제출 처리
app.post('/submit-form', (req, res) => {
    console.log(req.body);
    const { name, age, height, weight } = req.body;

    // MySQL에 데이터 저장
    const sql = 'INSERT INTO table1 (이름, 나이, 키, 몸무게) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, age, height, weight], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).json({ message: '이벤트 신청 실패' });
        } else {
            console.log('Data inserted into MySQL');
            res.status(200).json({ message: '이벤트 신청 성공' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
