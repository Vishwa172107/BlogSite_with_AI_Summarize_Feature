const BlogPosts = require("./mongo")
const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();
const port = 9999;

app.use(cors({ origin: "http://localhost:5173" }));
// app.use(cors("localhost:8000"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcome to Blog Site!")
})

app.get("/get-posts", async (req, res) => {
    try {
        const posts = await BlogPosts.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});

app.get("/summarize/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const post = await BlogPosts.findById(id);
        if (!post) {
            return res.status(404).send("Post not found");
        }

        const data = { text: post.Content };
        const summary = await axios.post("http://localhost:8000/post/text-summary", data);
        res.send(summary.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error processing request" });
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
