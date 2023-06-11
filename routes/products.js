const router = require("express").Router();
const Product = require("../models/Product");


//CREATE PRODUCT
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      data : savedProduct,
      message : "Product created successfully!"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
         await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        const product = await Product.findById(req.params.id);
        res.status(200).json({
          data: product,
          message:"Product updated successfully!"
        });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE PRODUCT
router.delete("/:id", async (req, res) => {
      try {
        const product = await Product.findById(req.params.id);
        await Product.deleteOne({_id :req.params.id});
        
         res.status(200).json({
            data: product,
            message: "Product deleted successfully!"
         } );
      } catch (err) {
        res.status(500).json(err);
      }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const {filterText} = req.query;
    let keystr = filterText ? filterText : "";
    keystr = keystr
    .replace(/[^a-zA-Z0-9 ]/g, "") //! extract all special characters
    .replace(/\s\s+/g, " ") //! multiple spaces to single spaces
    .trim();
  try {
    let product;

    if (keystr) {
      // Perform dynamic search using Mongoose
          product = await Product.find({
          title: { $regex: keystr, $options: "i" },
      }).limit(10);
    } else {
      // Fetch all products if no filter text provided
      product = await Product.find().limit(10);
    } 
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
