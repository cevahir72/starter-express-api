const router = require("express").Router();
const Answer = require("../models/Answer");


//CREATE ANSWER
router.post("/", async (req, res) => {
  const newAnswer = new Answer(req.body);
  try {
    const savedAnswer = await newAnswer.save();
    res.status(200).json({
      data : savedAnswer,
      message : "Answer created successfully!"
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE ANSWER
router.put("/:id", async (req, res) => {
  try {
       await Answer.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        const answer = await Answer.findById(req.params.id);
        res.status(200).json({
          data: answer,
          message:"Answer updated successfully!"
        });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE ANSWER
router.delete("/:id", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    await Answer.deleteOne({_id :req.params.id});
    res.status(200).json({
      data: answer,
      message: "Answer deleted successfully!"
   } ); 
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ANSWER
router.get("/:id", async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ANSWER
router.get("/", async (req, res) => {
  
  const {filterText} = req.query;
    let keystr = filterText ? filterText : "";
    keystr = keystr
    .replace(/[^a-zA-Z0-9 ]/g, "") //! extract all special characters
    .replace(/\s\s+/g, " ") //! multiple spaces to single spaces
    .trim();
  try {
    let answer;

    if (keystr) {
      // Perform dynamic search using Mongoose
      answer = await Answer.find({
          title: { $regex: keystr, $options: "i" },
      });
    } else {
      // Fetch all answers if no filter text provided
      answer = await Answer.find();
    } 
    res.status(200).json(answer);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;