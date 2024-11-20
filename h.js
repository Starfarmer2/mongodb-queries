printjson(db.people.aggregate([
    {
        $match: {
        }
    }
]).toArray());