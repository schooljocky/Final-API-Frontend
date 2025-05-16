// required modules //
const mongoose = require('mongoose');

// mongodb scheme for vhs entries //
const VHSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    vhsTitle: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    donatedDate: { type: Date, default: Date.now }
});

// create for module use //
module.exports = mongoose.model('VHS', VHSchema);