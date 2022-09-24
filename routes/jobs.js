const router = require("express").Router();
let Jobs = require("../models/jobs");
let Applications = require("../models/applications");
const mongoose = require("mongoose");

//////////////////////////////////////
///////////get Job detail by id  recruiter Auth required////////////////
router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Jobs.findById(id);
    const jobApplications = await Applications.aggregate([
      {
        $match: {
          job_id: ObjectId(id),
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "posted_by_user_id",
          foreignField: "_id",
          as: "candidates",
        },
      },
    ]);

    res.json(job, jobApplications);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//////////////////////////////////////
///////////get Active Jobs by recruiter_id recruiter Auth required////////////////
router.route("/activeJobs/:id/:limit").get(async (req, res) => {
  const id = req.params.id;
  const limit = req.params.limit;

  try {
    if (limit == "all") {
      const job = await Jobs.find(
        {
          user_id: id,
          status: 1,
        },
        { title: 1, industry: 1, positions: 1, type: 1 }
      );
      res.json(job);
    } else {
      const job = await Jobs.find(
        {
          user_id: id,
          status: 1,
        },
        { title: 1, industry: 1, positions: 1, type: 1 }
      ).limit(Number(limit));
      res.json(job);
    }
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});


//////////////////////////////////////
///////////get Inactive Jobs by recruiter_id recruiter Auth required////////////////
router.route("/inactiveJobs/:id/:limit").get(async (req, res) => {
      const id = req.params.id;
      const limit = req.params.limit;
    
      try {
        if (limit == "all") {
          const job = await Jobs.find(
            {
              user_id: id,
              status: 2,
            },
            { title: 1, industry: 1, positions: 1, type: 1 }
          );
          res.json(job);
        } else {
          const job = await Jobs.find(
            {
              user_id: id,
              status: 2,
            },
            { title: 1, industry: 1, positions: 1, type: 1 }
          ).limit(Number(limit));
          res.json(job);
        }
      } catch (error) {
        res.status(400).json("Error: " + error);
      }
    });

//////////////////////////////////////
///////////get Inactive Jobs by recruiter_id recruiter Auth required////////////////
router.route("/closeJobs/:id/:limit").get(async (req, res) => {
      const id = req.params.id;
      const limit = req.params.limit;
    
      try {
        if (limit == "all") {
          const job = await Jobs.find(
            {
              user_id: id,
              status: 3,
            },
            { title: 1, industry: 1, positions: 1, type: 1 }
          );
          res.json(job);
        } else {
          const job = await Jobs.find(
            {
              user_id: id,
              status: 3,
            },
            { title: 1, industry: 1, positions: 1, type: 1 }
          ).limit(Number(limit));
          res.json(job);
        }
      } catch (error) {
        res.status(400).json("Error: " + error);
      }
    });
//////////////////////////////////////
///////////Close Active Inactive Jobs by id recruiter Auth required////////////////
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
///////////update Jobs by id recruiter Auth required////////////////
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

module.exports = router;
