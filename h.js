printjson(db.people.aggregate([
    {
        $match: {
            _id: "HSED",
        }
    }
]).toArray());