const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// if (process.argv.length === 3) {
//     mongoose.connection.close();
//   });
// } else {
//   const person = new Person({
//     name: process.argv[3],
//     number: process.argv[4],
//   });

//   person.save().then((result) => {
//     console.log(`Added ${person.name} number ${person.number} to phonebook`);
//     mongoose.connection.close();
//   });
// }

module.exports = mongoose.model("Person", personSchema);
