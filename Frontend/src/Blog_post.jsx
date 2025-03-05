import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function Blog_post({ posts }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find((post) => post._id == id);

    if (!post) {
        return <div>Post not found.</div>;
    }

    const [summary, setSummary] = useState("");
    const [comment, setComment] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSummaryFetch = () => {
        setIsLoading(true);
        setError("");
        fetch(`http://localhost:9999/summarize/${post._id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch summary.");
                }
                return response.json();
            })
            .then((text) => {
                const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

                // Replace URLs with <a> tags
                let updatedSummary = text.summary.replace(urlPattern, (url) => {
                    // Add "http://" if the URL starts with "www."
                    if (url.startsWith("www.")) {
                        url = "http://" + url;
                    }

                    // Handle case where URL ends with a period and remove it
                    if (url.endsWith(".")) {
                        url = url.slice(0, -1);  // Remove trailing period
                    }

                    return `<a href="${url}" target="_blank">${url}</a>`;
                });

                setSummary(updatedSummary);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching summary:", error);
                setError("Error summarizing the post.");
                setIsLoading(false);
            });
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        console.log("Submitted comment:", comment);
        setComment("");
        alert("Comment submitted successfully!");
    };

    return (
        <div className="blog-post">
            <button onClick={() => navigate(-1)}>Back to Posts</button>
            <h2>{post.BlogTitle}</h2>
            <p>{post.Content}</p>

            <section className="summary-section">
                <h3>Summary</h3>
                <button onClick={handleSummaryFetch}>
                    {isLoading ? "Loading..." : "Fetch Summary"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {/* Using dangerouslySetInnerHTML to render HTML with anchor tags */}
                <p dangerouslySetInnerHTML={{ __html: summary }} />
            </section>

            <section className="comments-section">
                <h3>Comments</h3>
                <textarea
                    name="comment"
                    id="comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                />
                <button onClick={handleCommentSubmit}>Submit Comment</button>
            </section>
        </div>
    );
}
