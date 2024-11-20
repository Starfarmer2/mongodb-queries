printjson(db.committees.aggregate([
    {
        $match: {
            _id: "HSED"
        }
    },
    {
        $project: {
            _id: 1
        }
    }
]).toArray());