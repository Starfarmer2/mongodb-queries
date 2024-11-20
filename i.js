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
        committee: "$_id",
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
    },
    {
        $addFields: {
          party: "$party.party"
        }
    },
    {
        $group: {
          _id: {
            committee: "$committee",
            party: "$party"
          },
          count: { $sum: 1 }
        }
    },

    {
        $group: {
          _id: "$_id.committee",
          Democrat: {
            $sum: {
              $cond: [{ $eq: ["$_id.party", "Democrat"] }, "$count", 0]
            }
          },
          Republican: {
            $sum: {
              $cond: [{ $eq: ["$_id.party", "Republican"] }, "$count", 0]
            }
          },
          Independent: {
            $sum: {
              $cond: [{ $eq: ["$_id.party", "Independent"] }, "$count", 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          committee: "$_id",
          Democrat: 1,
          Republican: 1,
          Independent: 1
        }
      }

  ]).toArray());
  