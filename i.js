printjson(db.committees.aggregate([
    {
      $lookup: {
        from: "people",
        localField: "members.id",
        foreignField: "_id",
        as: "member_details"
      }
    },
    {
      $project: {
        committee: "$committee_name",
        members: {
          $filter: {
            input: "$member_details",
            as: "member",
            cond: {
              $eq: [
                {
                  $arrayElemAt: [
                    "$$member.roles.current",
                    0
                  ]
                },
                1
              ]
            }
          }
        }
      }
    },
    { $unwind: "$members" },
    {
        $addFields: {
            party: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: "$members.roles",
                    as: "role",
                    cond: { $eq: ["$$role.current", 1] }
                  }
                },
                0
              ]
            }
          }
    }
  ]).toArray());
  