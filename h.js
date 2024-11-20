printjson(db.people.aggregate([
    {
        $match: {
        }
    },
    {
        $project: {
            _id: 1
        }
    }
]).toArray());