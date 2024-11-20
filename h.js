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
            chair_person: { $arrayElemAt: ["$chair_person", 0]}
        }
    },




    // {

    // },
    // {
    //     $project: {
    //         _id: 1
    //     }
    // }
]).toArray());