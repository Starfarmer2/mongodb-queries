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
    }


    // {

    // },
    // {
    //     $project: {
    //         _id: 1
    //     }
    // }
]).toArray());