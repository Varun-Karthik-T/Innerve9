const mongoose = require('mongoose');

const userIssueSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  issueId: { type: String, required: true },
  voted: { type: String, required: true },
});

const UserIssue = mongoose.model('UserIssue', userIssueSchema);

module.exports = UserIssue;