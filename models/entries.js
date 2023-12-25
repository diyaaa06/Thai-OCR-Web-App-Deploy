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

const EntryModel = mongoose.model("entries", entriesSchema);
module.exports=EntryModel;
