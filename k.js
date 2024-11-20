printjson(db.people.aggregate([

    {
      $match: {
        gender: "F",
        "roles.current": 1,
        "roles.state": "CA"
      }
    },

    {
      $lookup: {
        from: "committees",
        localField: "_id",
        foreignField: "members.id",
        as: "committee_info"
      }
    },
    {
      $addFields: {
        subcommittee_members: {
          $reduce: {
            input: "$committee_info.subcommittees",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this.members"] }
          }
        }
      }
    },
    {
      $addFields: {
        all_committee_members: {
          $concatArrays: [
            { $arrayElemAt: ["$committee_info.members", 0] },
            "$subcommittee_members"
          ]
        }
      }
    },

    {
      $match: {
        all_committee_members: { $not: { $elemMatch: { id: "$_id" } } }
      }
    },
    {
      $project: {
        _id: 0,
        name: "$name" 
      }
    }
  ]).toArray());
  