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
        localField: "_id", // Match legislator ID in people with members.id in committees
        foreignField: "members.id",
        as: "committee_info"
      }
    },
    {
      $lookup: {
        from: "committees",
        let: { personId: "$_id" },
        pipeline: [
          { $unwind: "$subcommittees" }, // Unwind subcommittees
          { $unwind: "$subcommittees.members" }, // Unwind subcommittee members
          { $match: { $expr: { $eq: ["$$personId", "$subcommittees.members.id"] } } }
        ],
        as: "subcommittee_info"
      }
    },
    {
      $match: {
        committee_info: { $size: 0 },
        subcommittee_info: { $size: 0 } 
      }
    },
    {
      $project: {
        _id: 0, // Exclude _id from the output
        name: "$name" // Include only the name field
      }
    }
  ]).toArray());
  