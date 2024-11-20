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
        $unwind: "subcommittees.members"
    },

    // {

    // },
    // {
    //     $project: {
    //         _id: 1
    //     }
    // }
]).toArray());