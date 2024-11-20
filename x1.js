db.people.aggregate([
    // Filter for current Democrat legislators in NY
    {
      $match: {
        "roles.current": 1,
        "roles.party": "Democrat",
        "roles.state": "NY"
      }
    },
    // Project the required fields and calculate the age
    {
      $project: {
        _id: 0, // Exclude _id from the output
        name: "$name",
        gender: "$gender",
        age: {
          $subtract: [2024, { $year: "$birthday" }] // Approximate age
        },
        type: {
          $arrayElemAt: ["$roles.type", 0] // Assume one role per person; use the first type
        }
      }
    }
  ]);
  