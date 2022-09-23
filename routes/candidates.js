const router = require("express").Router();
let Applications = require("../models/applications");

//////////////////////////////////////
///////////get Applied by id ////////////////
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    var AppliedJobs = await Applications.findMany({ applied_by_user_id: id });
    res.json(AppliedJobs);
  } catch (error) {
    res.status(400).json("Error: " + err);
  }
});
