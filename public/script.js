async function fetchPosts() {
  const res = await fetch('/posts');
  const posts = await res.json();
  const container = document.getElementById('posts');
  container.innerHTML = '';

  console.log(posts)

  posts.rows.forEach(post => {
    const div = document.createElement('div');
    div.className = 'post';
    div.innerHTML = `
      <div class="post-title">${post.title}</div>
      <p>${post.content}</p>
      <button onclick="deletePost(${post.id})">삭제</button>
    `;
    container.appendChild(div);
  });
}

async function submitPost() {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) {
    alert('제목과 내용을 모두 입력하세요.');
    return;
  }

  await fetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content })
  });

  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
  fetchPosts();
}

async function deletePost(id) {
  if (!confirm('이 글을 삭제할까요?')) return;
  await fetch(`/posts/${id}`, { method: 'DELETE' });
  fetchPosts();
}

fetchPosts();
