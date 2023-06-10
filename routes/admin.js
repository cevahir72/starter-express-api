const router = require("express").Router();
const Sales = require("../models/Sales");
const User = require("../models/User");
const moment = require("moment");

//CREATE SALE
router.post("/", async (req, res) => {
  
  const newSale = new Sales(req.body);
  try {
    const savedSale = await newSale.save();
    if(req.body.percentage !== 8 ){
        let mySale = req.body;
         mySale.percentage = 2;
         mySale.username = "Admin";
      const newSale2 = new Sales(mySale);
       await newSale2.save();
    }
    res.status(200).json({
      data: savedSale,
      message: "Sale created successfully!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE SALE
router.put("/:id", async (req, res) => {
  try {
    await Sales.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const sale = await Sales.findById(req.params.id);
    res.status(200).json({
      data: sale,
      message: "Sale updated successfully!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE SALE
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    await Sales.deleteOne({ _id: req.params.id });
    res.status(200).json({
      data: sale,
      message: "Sale deleted successfully!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SALES FOR PROFILE
router.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  let sales;
  const startDate = moment().startOf("month"); // Bu ayın başlangıç tarihi
  const endDate = moment().endOf("month"); // Bu ayın bitiş tarihi

  try {
    const user = await User.find({ _id: id });

    sales = await Sales.find({
      username: user[0].username,
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SALE
router.get("/:id", async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    res.status(200).json(sale);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SALES
router.get("/", async (req, res) => {
  const { user } = req.query;
  let sales;
  try {
    if (user === "" || user == undefined) {
      sales = await Sales.find();
    } else {
      sales = await Sales.find({ username: user });
    }
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET MY ADMIN SALES
router.get("/mySales/:id", async (req, res) => {
  try {
    const usernames = ["Mevlüt", "Betül", "Admin"];
    const sales = await Sales.find({ username: { $in: usernames } });
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
