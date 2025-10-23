const express = require('express');
const path = require('path');
const db = require('./db'); // DB 연결 파일 불러오기
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// HTML 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 게시글 목록 가져오기
app.get('/posts', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
  res.json(rows);
});

// 게시글 추가
app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  await db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
  res.status(201).json({ message: '게시글 등록 완료' });
});

// 게시글 삭제
app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id;
  await db.query('DELETE FROM posts WHERE id = ?', [id]);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});
