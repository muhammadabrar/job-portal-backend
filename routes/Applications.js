const router = require("express").Router();
let Applications = require("../models/applications");
const mongoose = require("mongoose");

//////////////////////////////////////
///////////get Applied jobs by id for candidate dashboard ////////////////
router.route("/candidate/:id").get(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const ObjectId = mongoose.Types.ObjectId;

  try {
    var AppliedJobs = await Applications.aggregate([
      {
        $match: {
          applied_by_user_id: ObjectId(req.params.id),
        },
      },

      {
        $lookup: {
          from: "jobs",
          localField: "job_id",
          foreignField: "_id",
          as: "job",
         
            
        },
      },
    ]);
    console.log(AppliedJobs);

    res.json(AppliedJobs);
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});

//////////////////////////////////////
///////////get All Application for recruiter dashboard ////////////////
router.route("/recruiter/:id").get(async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const ObjectId = mongoose.Types.ObjectId;
    
      try {
        var AppliedJobs = await Applications.aggregate([
          {
            $match: {
                  posted_by_user_id: ObjectId(req.params.id),
            },
          },
    
          {
            $lookup: {
              from: "jobs",
              localField: "job_id",
              foreignField: "_id",
              as: "job",
            },
          },
          {
            $lookup: {
              from: "profile", 
            //   we need candidate Address, name, email, Higher education, Experiance, phone so we get all this data from profile schema here i named it candidate
              localField: "posted_by_user_id",
              foreignField: "_id",
              as: "candidates",
            },
          },
        ]).sort({datefield: -1});
        console.log(AppliedJobs);
    
        res.json(AppliedJobs);
      } catch (error) {
        res.status(400).json("Error: " + error);
      }
    });

//////////////////////////////////////
///////////shortlist or reject Jobs by id ////////////////
router.route("/:id").put(async (req, res) => {
      const id = req.params.id;
      const data = req.body.data;
    
      try {
        const Job = await Applications.updateOne(
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
    

module.exports = router;
