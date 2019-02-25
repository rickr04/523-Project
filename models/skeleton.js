var mongoose = require('mongoose');

var SkeletonSchema = new mongoose.Schema({
  Question: {
    type: String,
    unique: true,
    required: true,
  },
  Answer: {
      type: String,
      required: true
  }
},
{
  timestamps: true
});

var Skeleton = mongoose.model('Skeleton', SkeletonSchema);
module.exports = Skeleton;
