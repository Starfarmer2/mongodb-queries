db.committees.aggregate([
    {
      $lookup: {
        from: "people",
        localField: "members.id",
        foreignField: "_id",
        as: "member_details"
      }
    },

  ]);
  