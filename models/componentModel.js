const mongoose = require('mongoose');

const componentSchema = new mongoose.Schema({
    component_name: { type: String, required: true },
    component_html: { type: String, required: true }
});

module.exports = mongoose.model('Component', componentSchema);
