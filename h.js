printjson(db.committees.aggregate([
    {
        $match: {
            _id: "HSED",
            "subcommittees.displayname": "Higher Education and Workforce Development"
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