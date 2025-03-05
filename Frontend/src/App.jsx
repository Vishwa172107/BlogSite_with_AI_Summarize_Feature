import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Blog_post } from "./Blog_post";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading

  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch posts from the backend
    fetch("http://localhost:9999/get-posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data); // Update posts state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  return (
    <div>
      <Routes>
        {/* Main posts list */}
        <Route
          path="/"
          element={
            <div>
              {posts.map((post) => (
                <div key={post._id} className="post">
                  <h2>{post.BlogTitle}</h2>
                  <p>{post.Content.substring(0, 100)}...</p> {/* Show a preview */}
                  <button type="button" onClick={() => navigate(`/posts/${post._id}`)}>
                    View Full Post
                  </button>
                </div>
              ))}
            </div>
          }
        />

        {/* Dynamic route for a specific post */}
        <Route
          path="/posts/:id"
          element={<Blog_post posts={posts} />}
        />
      </Routes>
    </div>
  );
}

export default App;
