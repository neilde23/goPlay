const Match = require("../models/match.model.js");


exports.getAll = async (req, res) => {
    const { filters } = req.body;
    try 
    {
        const [matches] = await Match.getMatch(filters);
        res.json(matches);

    } catch (error) 
    {
        console.error('Error fetching matches:', error);
        res.status(500).json(error); 
    }

}