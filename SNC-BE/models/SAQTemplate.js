var mongoose = require('mongoose');

var SAQTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  questionids : {
      type: [Number],
      required: true
  }
}, 
{
  timestamps: true
});

var SAQTemplate = mongoose.model('SAQTemplate', SAQTemplateSchema);
module.exports = SAQTemplate;