const router = require("express").Router();
const Rival = require("../models/Rival");
const moment = require("moment");

//CREATE RIVAL SALE
router.post("/", async (req, res) => {
  
  const newSale = new Rival(req.body);
  try {
    const savedSale = await newSale.save();

    res.status(200).json({
      data: savedSale,
      message: "Rival Sale created successfully!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//UPDATE RIVAL SALE
router.put("/:id", async (req, res) => {
  try {
    await Rival.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const sale = await Rival.findById(req.params.id);
    res.status(200).json({
      data: sale,
      message: "Rival Sale updated successfully!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE SALE
router.delete("/:id", async (req, res) => {
  try {
    const sale = await Rival.findById(req.params.id);
    await Rival.deleteOne({ _id: req.params.id });
    res.status(200).json({
      data: sale,
      message: "Rival Sale deleted successfully!",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL SALES FOR PROFILE
router.get("/profile/:user", async (req, res) => {
  const user = req.params.user;
  let sales;
  const startDate = moment().startOf("month"); // Bu ayın başlangıç tarihi
  const endDate = moment().endOf("month"); // Bu ayın bitiş tarihi

  try {
    
    sales = await Rival.find({
      user: user,
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


//GET ALL RIVAL SALES
router.get("/", async (req, res) => {
  const { user } = req.query;
  let sales;
  try {
    if (user === "" || user == undefined) {
      sales = await Rival.find();
    } else {
      sales = await Rival.find({ user: user });
    }
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json(err);
  }
});

//MOST SALED PRODUCTS
router.get("/:id", async (req, res) => {
  try {
    let rival;
    rival = await Rival.aggregate([
     {
       $group: {
         _id: '$soldProduct',
         count: { $sum: 1 }
       }
     },
     {
       $sort: { count: -1 }
     }
   ])
   
   res.status(200).json(rival);
 } catch (err) {
   res.status(500).json(err);
 }
});



module.exports = router;
