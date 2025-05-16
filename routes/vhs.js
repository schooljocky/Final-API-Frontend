// required modules //
var express = require('express');
var router = express.Router();
var VHS = require('../models/VHS');

// add new VHS items //
router.post('/', async (req, res) => {
    try {
        const { name, vhsTitle, releaseDate } = req.body;

        // Create and save the VHS item //
        const newVHS = new VHS({
            donorName: name,
            vhsTitle: vhsTitle,
            releaseDate: new Date(releaseDate)
        });

        await newVHS.save();

        console.log("New record saved to database");

        res.redirect('/');
    } catch (error) {
        console.error('Error saving VHS:', error);
        res.status(500).send('Error saving VHS to the database');
    }
});

// Delete a VHS tape by ID //
router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting VHS with ID:", id);
        
        const result = await VHS.findByIdAndDelete(id);
        if (!result) return res.status(404).json({ error: "VHS not found" });

        res.json({ message: "VHS deleted successfully" });
    } catch (error) {
        console.error("Error deleting VHS:", error);
        res.status(500).json({ error: "Error deleting VHS: "}); 
    }
});

// update a list of VHS items //
router.post('/update', async (req, res) => {
    try {
        const updatedVHS = req.body; 

        for (const item of updatedVHS) {
            await VHS.findByIdAndUpdate(item.id, {
                donorName: item.donor,
                vhsTitle: item.title,
                releaseDate: new Date(item.releaseDate),
                donatedDate: new Date(item.donatedDate)
            });
        }

        res.json({ success: true, message: "VHS records updated successfully!" });
    } catch (error) {
        console.error("Error updating VHS records:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// create for module use //
module.exports = router;