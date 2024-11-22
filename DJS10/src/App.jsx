import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]); // State to store posts
  const [error, setError] = useState(null); // State to store error messages
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    setLoading(true); // Set loading to true when fetching starts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false); // Set loading to false after fetching
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); // Set loading to false even on error
      });
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
