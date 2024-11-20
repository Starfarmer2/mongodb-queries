printjson(db.people.aggregate([
    // Step 1: Filter female legislators currently serving in California
    {
      $match: {
        gender: "F", // Female legislators
        "roles.current": 1, // Currently serving
        "roles.state": "CA" // Serving California
      }
    },
    // Step 2: Perform a lookup to find their committee and subcommittee assignments
    {
      $lookup: {
        from: "committees",
        localField: "_id", // Match legislator ID in people with members.id in committees
        foreignField: "members.id",
        as: "committee_info"
      }
    },
    // Step 3: Check for subcommittees and members in them
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
    // Step 4: Combine main committee members and subcommittee members
    {
      $addFields: {
        all_committee_members: {
          $concatArrays: [
            { $arrayElemAt: ["$committee_info.members", 0] }, // Main committee members
            "$subcommittee_members" // Subcommittee members
          ]
        }
      }
    },
    // Step 5: Exclude legislators assigned to any committees or subcommittees
    {
      $match: {
        all_committee_members: { $not: { $elemMatch: { id: "$_id" } } }
      }
    },
    // Step 6: Project the result in the required format
    {
      $project: {
        _id: 0, // Exclude _id from the output
        name: "$name" // Include only the name field
      }
    }
  ]).toArray());
  