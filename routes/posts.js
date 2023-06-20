const router = require("express").Router();
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      data : savedPost,
      message : "Post created successfully!"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
        await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        const post = await Post.findById(req.params.id);
        res.status(200).json({
          data : post,
          message : "Post updated successfully!"
        });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
        const post = await Post.findById(req.params.id);
        await Post.deleteOne({_id :req.params.id});
        res.status(200).json({
            data: post,
            message: "Post deleted successfully!"
        });
          
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
    const {user} = req.query;
    let  posts;
  try {
    if(user === '' || user== undefined ) {
        posts = await Post.find().sort({ createdAt: 1 }); 
    }else{
      posts = await Post.find({username : user }).sort({ createdAt: 1 });
    }    
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
