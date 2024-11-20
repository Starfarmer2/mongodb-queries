printjs(db.people.aggregate([
    // Step 1: Filter for female legislators currently serving California
    {
      $match: {
        gender: "F", // Female legislators
        "roles.current": 1, // Currently serving
        "roles.state": "CA" // State is California
      }
    },
    // Step 2: Filter out those serving in any committee or subcommittee
    {
      $match: {
        "roles.committees": { $exists: false }, // No committees assigned
        "roles.subcommittees": { $exists: false } // No subcommittees assigned
      }
    },
    // Step 3: Project only the name field in the required format
    {
      $project: {
        _id: 0, // Exclude _id from the output
        name: "$name"
      }
    }
  ]).toArray());