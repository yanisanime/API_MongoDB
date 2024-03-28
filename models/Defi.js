//models/Defi.js
const mongoose = require('mongoose');

const defiSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
  });
  
  module.exports = mongoose.model('Defi', defiSchema);