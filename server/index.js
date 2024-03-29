require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, DATABASE_URL, SESSION_SECRET } = process.env;
const userCtrl = require("./controllers/userController");
const cmntCtrl = require("./controllers/commentController");
const postCtrl = require("./controllers/postController");
const textCtrl = require("./controllers/textController");
const lociCtrl = require("./controllers/locationsController");

const app = express();

const path = require('path');

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../build")))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

massive({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})
  .then((db) => {
    app.set("db", db);
    console.log(`db is up, m'lord`);
  })
  .catch((err) => console.log(err));

// USER ENDPOINTS

app.post('/api/login', userCtrl.login);
app.post('/api/register', userCtrl.register);
app.post('/api/logout', userCtrl.logout);
app.put('/api/adventurer', userCtrl.editAdventurer);
app.get('/api/adventurer', userCtrl.getAdventurer);
app.get('/api/advprofile/:id', userCtrl.getOtherAdventurers);

// COMMENT ENDPOINTS
app.get("/api/comments/:post_id", cmntCtrl.getAllComments);
app.post("/api/comments/:post_id", cmntCtrl.addComment);
app.put("/api/comments/:commentId", cmntCtrl.updateComment);
app.delete("/api/comments/:commentId", cmntCtrl.deleteComment);

///Post endpoints

app.get('/api/post/:id', postCtrl.getPost)
app.get('/api/post', postCtrl.getPosts)
app.get('/api/profileposts/:id', postCtrl.getUserPosts)
app.post('/api/post', postCtrl.createPost)
app.put('/api/post/:id', postCtrl.updatePost)
app.delete('/api/post/:id', postCtrl.deletePost)

//GoogleMaps Endpoints
app.get('/api/locations', lociCtrl.getLocations)
app.post('/api/locations', lociCtrl.createLocation)
app.put('/api/locations/:id', lociCtrl.updateLocation)
app.delete('/api/locations/:id', lociCtrl.deleteLocation)

app.get('/*',function(req,res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || SERVER_PORT

app.listen(port, () =>
  console.log(`server is running in ${port}`)
);
