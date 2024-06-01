import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/add", (req, res) => {
    res.render("add.ejs");
});

app.post("/add", (req, res) => {
    const {title, content} = req.body;
    posts.push({title, content});
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const post = posts[req.params.id];
    res.render("edit.ejs", {post, id: req.params.id});
})

app.post("/edit/:id", (req, res) => {
    const {title, content} = req.body;
    posts[req.params.id] = {title, content};
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
