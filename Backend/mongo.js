const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BlogSy")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error Connecting to MongoDB", err))

const BlogSchema = new mongoose.Schema({
    BlogTitle: String,
    Content: String
})

module.exports = mongoose.model("BlogPosts", BlogSchema)

// const posts = [
//     {
//         "BlogTitle": "The Future of Artificial Intelligence",
//         "Content": "Artificial intelligence is revolutionizing industries, from healthcare to finance. With advancements in deep learning and natural language processing, AI is becoming more intuitive and capable. However, ethical considerations and responsible AI development remain crucial for the future."
//     },
//     {
//         "BlogTitle": "Top 5 Web Development Trends in 2025",
//         "Content": "Web development is evolving rapidly, with trends like serverless architecture, AI-driven chatbots, and the rise of WebAssembly. Developers are also focusing on improving accessibility and enhancing user experience with new frameworks and tools."
//     },
//     {
//         "BlogTitle": "Why Cybersecurity is More Important Than Ever",
//         "Content": "With increasing cyber threats and data breaches, businesses must prioritize cybersecurity. Implementing robust authentication methods, regular security audits, and employee training are essential to protect sensitive information."
//     },
//     {
//         "BlogTitle": "The Rise of Remote Work and Its Impact",
//         "Content": "Remote work has transformed how businesses operate, increasing flexibility and work-life balance. However, it also brings challenges like maintaining productivity and ensuring cybersecurity for remote employees."
//     },
//     {
//         "BlogTitle": "The Role of Blockchain Beyond Cryptocurrency",
//         "Content": "Blockchain technology is not just for cryptocurrencies. Industries like supply chain management, healthcare, and voting systems are exploring blockchain for its transparency and security benefits."
//     }
// ];

// BlogPosts.insertMany(posts);