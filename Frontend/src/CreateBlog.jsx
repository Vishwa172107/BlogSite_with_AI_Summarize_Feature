import React from "react";
import "./App.css";

export function CreateBlog() {
    return (
        <div>
            <h1>Blog Post</h1>
            <form>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" placeholder="Enter title" />
                <br />
                <label for="content">Content:</label>
                <textarea id="content" name="content" placeholder="Enter content" />
                <br />
                <label for="type">Post as: </label>
                <br />
                <input type="radio" name="type" id="anon" />
                <label for="anon">Anonymous</label>
                <input type="radio" name="type" id="public" />
                <label for="public">Public</label>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}