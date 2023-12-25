const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EntryModel = require('./models/entries');
const path=require('path');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname,'./client/build')));
// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nwbn5mr.mongodb.net/ThaiOCR?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/insert', async (req, res) => {
  const entryData = req.body;
  try {if(entryData.id_number){
  try {
    // Check if an entry with the same ID number already exists
    const existingEntry = await EntryModel.findOne({ id_number: entryData.id_number });

    if (existingEntry) {
      // Update the existing entry if found
      Object.assign(existingEntry, entryData); // Update the existing entry with new data
      await existingEntry.save();
      res.status(200).send({ message: "Data updated" }); // Send a specific message for data updated
    } else {
      // Create a new entry if not found
      const newEntry = new EntryModel(entryData);
      await newEntry.save();
      res.status(201).send({ message: "Data inserted" }); // Send a specific message for new data inserted
    }
  } catch (err) {
    // console.error(err);
    res.status(500).send({ message: "Error processing request" });
  }
}else{
      const newEntry = new EntryModel(entryData);
      await newEntry.save();
      res.status(201).send({ message: "Data inserted" });
}}catch(err){
  // console.error(err);
    res.status(500).send({ message: "Error processing request" });
}
});

// Add a GET request to fetch all entries
app.get('/entries', async (req, res) => {
  try {
    const allEntries = await EntryModel.find();
    res.status(200).send(allEntries);
  } catch (err) {
    // console.error(err);
    res.status(500).send("Error fetching entries");
  }
});

// Add a DELETE request to delete an entry by ID
app.delete('/entries/:id', async (req, res) => {
  const entryId = req.params.id;

  try {
    await EntryModel.findByIdAndDelete(entryId);
    res.status(200).send("Entry deleted");
  } catch (err) {
    // console.error(err);
    res.status(500).send("Error deleting entry");
  }
});

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'),function(err){
    res.status(500).send(err);
  });
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
