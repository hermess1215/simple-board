const express = require('express');
const path = require('path');
const app = express();

let posts = []; // 게시글 저장소
let nextId = 1;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// HTML 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 게시글 목록 가져오기
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 게시글 추가
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: nextId++,
    title,
    content
  };
  posts.unshift(newPost);
  res.status(201).json(newPost);
});

// 게시글 삭제
app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  posts = posts.filter(p => p.id !== id);
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('서버 실행 중: http://localhost:3000');
});
