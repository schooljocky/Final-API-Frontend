// required modules //
var VHS = require('../models/VHS');

// create controller class to house API functions //
class VHSController {

  // get all with error handling //
  async getAll(req, res) {
    try {
      const vhsList = await VHS.find().sort({ donatedDate: -1 });
      res.status(200).json(vhsList);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch VHS tapes.' });
    }
  }

  //get by id or get 1 with error handling //
  async getById(req, res) {
    try {
      const vhs = await VHS.findById(req.params.id);
      if (!vhs) return res.status(404).json({ error: 'VHS not found.' });
      res.status(200).json(vhs);
    } catch (err) {
      res.status(400).json({ error: 'Invalid ID.' });
    }
  }

  // create new entry with using VHS scheme with error handling //
  async create(req, res) {
    try {
      const newVHS = new VHS({
        donorName: req.body.name,
        vhsTitle: req.body.vhsTitle,
        releaseDate: new Date(req.body.releaseDate),
        donatedDate: new Date()
      });

      const saved = await newVHS.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: 'Invalid VHS data.' });
      console.log(req.body);
    }
  }

  // update entry by id with error handling //
  async update(req, res) {
    try {
      const updated = await VHS.findByIdAndUpdate(
        req.params.id,
        {
          donorName: req.body.donorName,
          vhsTitle: req.body.vhsTitle,
          releaseDate: new Date(req.body.releaseDate),
          donatedDate: new Date(req.body.donatedDate) || new Date()
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ error: 'VHS not found.' });
      res.status(200).json(updated);
    } catch (err) {
      res.status(400).json({ error: 'Failed to update VHS.' });
    }
  }

  // delete entry by id with error handling //
  async delete(req, res) {
    console.log(req.params.id);

    try {
      const deleted = await VHS.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'VHS not found.' });
      res.status(200).json({ message: 'VHS deleted.' });
    } catch (err) {
      res.status(400).json({ error: 'Failed to delete VHS.' });
    }
  }
}

// create for module use //
module.exports = new VHSController();