printjson(db.committees.aggregate([
    {
        $match: {
            _id: "HSED",
        }
    },
    {
        $unwind: "$subcommittees"
    },
    {
        $match: {
            "subcommittees.displayname": "Higher Education and Workforce Development"
        }
    },
    {
        $unwind: "$subcommittees.members"
    },
    {
        $match: {
            "subcommittees.members.role": "Chair"
        }
    },
    {
        $project: {
            subcommittees: {
                members: {
                    id: 1
                }
            }
        }
    },
    {
        $lookup: {
            from: "people",
            localField: "subcommittees.members.id",
            foreignField: "_id",
            as: "chair"
        }
    },
    {
        $project: {
            chair: { $arrayElemAt: ["$chair", 0]}
        }
    },
    {
        $replaceRoot: {newRoot: "$chair"}
    }
]).toArray());