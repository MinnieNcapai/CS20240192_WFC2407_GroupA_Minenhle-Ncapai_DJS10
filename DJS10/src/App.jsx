import  { useState, useEffect } from 'react';

function App() {
  // State variables to store posts, error messages, and loading state
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch blog posts from the API
  const fetchPosts = () => {
    setLoading(true); // Set loading to true whenever fetching starts
    fetch('https://jsonplaceholder.typicode.com/posts')
       // Check if the response is successful, if not, throw an error
      .then(response => {
        if (!response.ok) {
          throw new Error('Could not load posts.');
        }
        return response.json();  // Parse the JSON response
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);  // Set error state if fetch fails
        setLoading(false); // Set loading to false even if there's an error
      });
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []); // Fetch posts once when the component mounts

  // Show loading message if data is still being fetched
  if (loading) return <div>Loading...</div>;
  // Show error message if there's an error fetching the data
  if (error)
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchPosts}>Retry</button> {/* Button to retry fetching */}
      </div>
    );

  // If there's no error and data is fetched, show the posts
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
      {posts.map((post, index) => (
          <li key={post.id}>
            <h2>{index + 1}. {post.title}</h2> {/* Display post number and title */}
            <p>{post.body}</p> {/* Display post body */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
