printjson(db.people.aggregate([
    {
        $match: {
            displayname: "House Select Committee on the Strategic Competition Between the United States and the Chinese Communist Party",
        }
    }
]).toArray());