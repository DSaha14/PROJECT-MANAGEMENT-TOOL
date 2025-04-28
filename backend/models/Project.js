const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    deadline: Date
});

module.exports = mongoose.model('Project', ProjectSchema);
