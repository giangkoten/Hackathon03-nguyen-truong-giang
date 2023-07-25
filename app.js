const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

//thong tin tat ca users
app.get("/api/v1/users", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    res.json({
      users: users,
    });
    console.log(users);
  } catch (error) {
    console.log(error);
  }
});
//thong tin 1 user bat ky
app.get("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;

  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let user = users.find((e, i) => e.id == +id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    } else {
      res.json({
        user: user,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
//Them 1 user vao mang data
app.post("/api/v1/users", (req, res) => {
  let { name, username, email, address, phone, website, company } = req.body;
  let userNew = {
    id: Math.floor(Math.random() * 1000),
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  };
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    users.push(userNew);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json({
      message: "create user sucessfully",
      id: userNew.id,
    });
  } catch (error) {
    console.log(error);
  }
});
//Edit email
app.put("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;
  let { email } = req.body;

  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let userIndex = users.findIndex((user) => user.id == id);

    if (userIndex === -1) {
      return res.json({
        message: "Not found user",
      });
    }
    users[userIndex].email = email;
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json({
      message: "Update success",
      user: users[userIndex],
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
//Delete user
app.delete("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let users = JSON.parse(fs.readFileSync("./data/users.json"));

    let updateUsers = users.filter((user) => user.id != id);

    fs.writeFileSync("./data/users.json", JSON.stringify(updateUsers));

    res.json({ message: "Update success" });
  } catch (error) {
    console.log(error);
  }
});
//thong tin tat ca posts
app.get("/api/v1/posts", (req, res) => {
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    res.json({
      posts: posts,
    });
    console.log(posts);
  } catch (error) {
    console.log(error);
  }
});
//thong tin 1 post bat ky
app.get("/api/v1/posts/:id", (req, res) => {
  let { id } = req.params;

  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    let post = posts.find((e, i) => e.id == +id);
    if (!post) {
      res.json({
        message: "post not found",
      });
    } else {
      res.json({
        post: post,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
//Them 1 post vao mang data
app.post("/api/v1/posts", (req, res) => {
  let { title, body } = req.body;
  let postNew = {
    id: Math.floor(Math.random() * 1000),
    title,
    body,
    userId: 10,
  };
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    posts.push(postNew);
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json({
      message: "create user sucessfully",
    });
  } catch (error) {
    console.log(error);
  }
});
//Edit posts
app.put("/api/v1/posts/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;

  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
    let postIndex = posts.findIndex((post) => post.id == id);

    if (postIndex === -1) {
      return res.json({
        message: "Not found user",
      });
    }
    posts[postIndex].title = title;
    posts[postIndex].body = body;
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json({
      message: "Update success",
      post: posts[postIndex],
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});
//Delete post
app.delete("/api/v1/posts/:id", (req, res) => {
  let { id } = req.params;
  try {
    let posts = JSON.parse(fs.readFileSync("./data/posts.json"));

    let updatePosts = posts.filter((posts) => posts.id != id);

    fs.writeFileSync("./data/posts.json", JSON.stringify(updatePosts));

    res.json({ message: "Update success" });
  } catch (error) {
    console.log(error);
  }
});
//Lấy toàn bộ post của 1 user
app.get("/api/v1/users/:id/posts", (req, res) => {
  let { id } = req.params;
  let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
  let postUser = posts.filter((post) => post.userId == id);
  res.json({ postUser });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
