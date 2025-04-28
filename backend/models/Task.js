const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    name: String,
    assignedTo: String,
    deadline: Date,
    status: { type: String, default: 'Todo' }
});

module.exports = mongoose.model('Task', TaskSchema);
