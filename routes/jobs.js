const router = require("express").Router();
let Jobs = require("../models/jobs");
let Applications = require("../models/applications");

//////////////////////////////////////
///////////get Jobs by id ////////////////
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Jobs.findById(id);
    if (job) {
      var jobApplications = await Applications.findMany({ job_id: id });
    }
    res.json(job, jobApplications);
  } catch (error) {
    res.status(400).json("Error: " + err);
  }
});

//////////////////////////////////////
///////////Delete Active Inactive Jobs by id ////////////////
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const data = req.body.data;

  try {
    const Job = await Jobs.updateOne(
      { _id: id },
      {
        $set: {
          status: data,
        },
      }
    );
    res.json(Job);
  } catch (error) {
    res.status(400).json("Error: " + err);
  }
});

//////////////////////////////////////
///////////update Jobs by id ////////////////
router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  const data = req.body.data;

  try {
    const Job = await Jobs.updateOne(
      { _id: id },
      {
        $set: {
          data,
        },
      }
    );
    res.json(Job);
  } catch (error) {
    res.status(400).json("Error: " + err);
  }
});
