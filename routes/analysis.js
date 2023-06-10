const router = require("express").Router();
const Post = require("../models/Post");

//MOST SALED PRODUCT
router.get("/", async (req, res) => {
    try {
       let post;
       post = await Post.aggregate([
        {
            $match: { sale: true } 
        },
        {
          $group: {
            _id: '$soldProduct',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]).limit(10)
      
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //MOST SALED LOCATION - ZIP CODES
router.get("/zip", async (req, res) => {
    const { location } = req.query;
    console.log(location)
    try {
       let post;
       if ( location !== "all"){
        
                post = await Post.aggregate([
                    {
                      $match: { sale: true, location: location } 
                    },
                    {
                      $group: {
                        _id: '$zip',
                        count: { $sum: 1 }
                      }
                    }
                  ])
            }else{
                post = await Post.aggregate([
                    {
                      $match: { sale: true } 
                    },
                    {
                      $group: {
                        _id: '$zip',
                        count: { $sum: 1 }
                      }
                    }
                  ])
            }
       
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;
