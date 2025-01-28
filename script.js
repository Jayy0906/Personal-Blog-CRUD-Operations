document.addEventListener("DOMContentLoaded", () => {
  const blogForm = document.getElementById("blogForm");
  const blogPosts = document.getElementById("blogPosts");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const postIdInput = document.getElementById("postId");

  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  const renderPosts = () => {
    blogPosts.innerHTML = "";
    if (posts.length === 0) {
      blogPosts.innerHTML =
        '<p class="text-muted">No blog posts available.</p>';
      return;
    }
    posts.forEach((post, index) => {
      const postDiv = document.createElement("div");
      postDiv.className = "blog-post";
      postDiv.innerHTML = `
                        <h3 class="post-title" onclick="viewPost(${index})">${
        post.title
      }</h3>
                        <p class="post-content">${post.content.substring(
                          0,
                          100
                        )}...</p>
                        <button class="btn btn-sm btn-primary" onclick="editPost(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deletePost(${index})">Delete</button>
                    `;
      blogPosts.appendChild(postDiv);
    });
  };

  const savePost = () => {
    const title = titleInput.value;
    const content = contentInput.value;
    const postId = postIdInput.value;

    if (postId) {
      posts[postId] = { title, content };
    } else {
      posts.push({ title, content });
    }

    localStorage.setItem("blogPosts", JSON.stringify(posts));
    renderPosts();
    blogForm.reset();
    postIdInput.value = "";
  };

  const editPost = (index) => {
    const post = posts[index];
    titleInput.value = post.title;
    contentInput.value = post.content;
    postIdInput.value = index;
  };

  const deletePost = (index) => {
    posts.splice(index, 1);
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    renderPosts();
  };

  window.viewPost = (index) => {
    const post = posts[index];
    alert(`Title: ${post.title}\n\nContent:\n${post.content}`);
  };

  window.editPost = editPost;
  window.deletePost = deletePost;

  blogForm.addEventListener("submit", (e) => {
    e.preventDefault();
    savePost();
  });

  renderPosts();
});
