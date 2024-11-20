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
            "subcommittees.members.role": "Chairman"
        }
    }


    // {

    // },
    // {
    //     $project: {
    //         _id: 1
    //     }
    // }
]).toArray());