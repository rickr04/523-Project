const mongoose = require('mongoose');
const Question = require('./Question')
const Schema = mongoose.Schema;

const SAQTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  questions : [{
    type:  String, 
    ref: 'Question',
    required: true
  }]
}, 
{
  timestamps: true
});

const SAQTemplate = mongoose.model('SAQTemplate', SAQTemplateSchema);
module.exports = SAQTemplate;