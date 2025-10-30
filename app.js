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
  try {
    const rows = await db.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err); // 서버 콘솔에 에러 출력
    res.status(500).json({ error: '서버 내부 오류 발생' });
  }
});

// 게시글 추가
app.post('/posts', async (req, res) => {
  try {
    const { title, content } = req.body;
    await db.query('INSERT INTO posts (title, content) VALUES ($1, $2)', [title, content]);
    res.status(201).json({ message: '게시글 등록 완료' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 내부 오류 발생' });
  }
});

// 게시글 삭제
app.delete('/posts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM posts WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '서버 내부 오류 발생' });
  }
});

const PORT = process.env.PORT || 3000; // 배포 시 Render에서 할당한 PORT 사용
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
