const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  issue_type: { type: String, required: true },
  description: { type: String, required: true },
  date_of_complaint: { type: String, required: true },
  approval: { type: Number, required: true },
  denial: { type: Number, required: true },
  status: { type: String, required: true },
  image: { type: String, required: false },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;