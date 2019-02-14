const mongoose = require('mongoose');
const Question = require('./Question.js')

const SAQTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  questions : {
      type: [Question.Schema],
      required: true
  }
}, 
{
  timestamps: true
});

const SAQTemplate = mongoose.model('SAQTemplate', SAQTemplateSchema);
module.exports = SAQTemplate;