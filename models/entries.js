const mongoose =require('mongoose')

const entriesSchema = new mongoose.Schema({
  id_number: {
    type: String,
  },
  name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  dateOfIssue: {
    type: Date,
  },
  dateOfExpiry: {
    type: Date,
  },
  status: {
    type: String,
    required: true
  },
  error_msg: {
    type: String
  },
  timeStamp: {
    type: Date,
    default: Date.now
  }
});
// entriesSchema.pre('save', function (next) {
//   // Check if the document is new or being updated
//   if (this.isNew || this.isModified()) {
//     this.timeStamp = Date.now(); // Set the timeStamp to the current date and time
//   }
//   next();
// });
const EntryModel = mongoose.model("entries", entriesSchema);
module.exports=EntryModel;
