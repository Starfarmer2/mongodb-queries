printjson(db.people.aggregate([
  {
    $match: {
      "roles.current": 1,
      "roles.party": "Democrat",
      "roles.state": "NY"
    }
  },
  {
    $project: {
      _id: 0,
      name: "$name",
      gender: "$gender",
      age: {
        $subtract: [2024, { $year: "$birthday" }]
      },
      type: {
        $arrayElemAt: [
          {
            $filter: {
              input: "$roles",
              as: "role",
              cond: {
                $and: [
                  { $eq: ["$$role.current", 1] },
                  { $eq: ["$$role.party", "Democrat"] },
                  { $eq: ["$$role.state", "NY"] }
                ]
              }
            }
          },
          0
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      gender: 1,
      age: 1,
      type: "$type.type"
    }
  }
]).toArray());
